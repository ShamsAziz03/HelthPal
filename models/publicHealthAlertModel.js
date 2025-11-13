const db = require('../config/db');

class PublicHealthAlert {

    // Helper function to safely parse JSON
    static safeJSONParse(jsonString) {
        if (!jsonString) return [];

        // If it's already an array, return it
        if (Array.isArray(jsonString)) return jsonString;

        // If it's not a string, try to convert it
        if (typeof jsonString !== 'string') return [];

        try {
            const parsed = JSON.parse(jsonString);
            // If parsed result is not an array, wrap it in an array
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch (error) {
            console.warn('Invalid JSON in affectedAreas:', jsonString);
            // If parsing fails, return it as a single-item array
            return [jsonString];
        }
    }

    static async create(alertData) {
        const { alertId, title, description, severity, affectedAreas, expiresAt } = alertData;

        const query = `
            INSERT INTO PublicHealthAlert 
            (alertId, title, description, severity, affectedAreas, issuedAt, expiresAt)
            VALUES (?, ?, ?, ?, ?, NOW(), ?)
        `;

        // Ensure affectedAreas is properly formatted as JSON array
        let affectedAreasJson = null;
        if (affectedAreas) {
            if (Array.isArray(affectedAreas)) {
                affectedAreasJson = JSON.stringify(affectedAreas);
            } else if (typeof affectedAreas === 'string') {
                // If it's already a JSON string, use it as is, otherwise wrap it
                try {
                    JSON.parse(affectedAreas);
                    affectedAreasJson = affectedAreas;
                } catch {
                    affectedAreasJson = JSON.stringify([affectedAreas]);
                }
            } else {
                affectedAreasJson = JSON.stringify([affectedAreas]);
            }
        }

        try {
            const [result] = await db.execute(query, [
                alertId,
                title,
                description,
                severity,
                affectedAreasJson,
                expiresAt || null
            ]);

            return { alertId, ...alertData, issuedAt: new Date() };
        } catch (error) {
            throw error;
        }
    }

    // Get all active public health alerts with optional filters 
    static async getActive(filters = {}) {
        let query = `
            SELECT * FROM PublicHealthAlert 
            WHERE (expiresAt IS NULL OR expiresAt > NOW())
        `;
        const params = [];

        if (filters.severity) {
            query += ' AND severity = ?';
            params.push(filters.severity);
        }

        if (filters.area) {
            query += ' AND JSON_CONTAINS(affectedAreas, ?)';
            params.push(JSON.stringify(filters.area));
        }

        query += ' ORDER BY severity DESC, issuedAt DESC';

        if (filters.limit) {
            query += ' LIMIT ?';
            params.push(parseInt(filters.limit));
        }

        try {
            const [rows] = await db.execute(query, params);
            return rows.map(row => ({
                ...row,
                affectedAreas: this.safeJSONParse(row.affectedAreas)
            }));
        } catch (error) {
            throw error;
        }
    }

    // Get all alerts with optional filters
    static async getAll(filters = {}) {
        let query = 'SELECT * FROM PublicHealthAlert WHERE 1=1';
        const params = [];

        if (filters.severity) {
            query += ' AND severity = ?';
            params.push(filters.severity);
        }

        if (filters.active !== undefined) {
            if (filters.active === 'true' || filters.active === true) {
                query += ' AND (expiresAt IS NULL OR expiresAt > NOW())';
            } else {
                query += ' AND expiresAt IS NOT NULL AND expiresAt <= NOW()';
            }
        }

        if (filters.area) {
            query += ' AND JSON_CONTAINS(affectedAreas, ?)';
            params.push(JSON.stringify(filters.area));
        }

        query += ' ORDER BY issuedAt DESC';

        if (filters.limit) {
            query += ' LIMIT ?';
            params.push(parseInt(filters.limit));
        }

        if (filters.offset) {
            query += ' OFFSET ?';
            params.push(parseInt(filters.offset));
        }

        try {
            const [rows] = await db.execute(query, params);
            return rows.map(row => ({
                ...row,
                affectedAreas: this.safeJSONParse(row.affectedAreas),
                isActive: !row.expiresAt || new Date(row.expiresAt) > new Date()
            }));
        } catch (error) {
            throw error;
        }
    }

    // Get alert by ID
    static async getById(alertId) {
        const query = 'SELECT * FROM PublicHealthAlert WHERE alertId = ?';

        try {
            const [rows] = await db.execute(query, [alertId]);
            if (rows.length === 0) return null;

            const alert = rows[0];
            return {
                ...alert,
                affectedAreas: this.safeJSONParse(alert.affectedAreas),
                isActive: !alert.expiresAt || new Date(alert.expiresAt) > new Date()
            };
        } catch (error) {
            throw error;
        }
    }

    // Get alerts by severity
    static async getBySeverity(severity) {
        const query = `
            SELECT * FROM PublicHealthAlert 
            WHERE severity = ? 
            AND (expiresAt IS NULL OR expiresAt > NOW())
            ORDER BY issuedAt DESC
        `;

        try {
            const [rows] = await db.execute(query, [severity]);
            return rows.map(row => ({
                ...row,
                affectedAreas: this.safeJSONParse(row.affectedAreas)
            }));
        } catch (error) {
            throw error;
        }
    }

    // Get alerts by area
    static async getByArea(area) {
        const query = `
            SELECT * FROM PublicHealthAlert 
            WHERE JSON_CONTAINS(affectedAreas, ?)
            AND (expiresAt IS NULL OR expiresAt > NOW())
            ORDER BY severity DESC, issuedAt DESC
        `;

        try {
            const [rows] = await db.execute(query, [JSON.stringify(area)]);
            return rows.map(row => ({
                ...row,
                affectedAreas: this.safeJSONParse(row.affectedAreas)
            }));
        } catch (error) {
            throw error;
        }
    }

    // Update alert
    static async update(alertId, updates) {
        const fields = [];
        const params = [];

        if (updates.title) {
            fields.push('title = ?');
            params.push(updates.title);
        }

        if (updates.description) {
            fields.push('description = ?');
            params.push(updates.description);
        }

        if (updates.severity) {
            fields.push('severity = ?');
            params.push(updates.severity);
        }

        if (updates.affectedAreas) {
            fields.push('affectedAreas = ?');
            // Ensure it's always an array before stringifying
            const areasArray = Array.isArray(updates.affectedAreas)
                ? updates.affectedAreas
                : [updates.affectedAreas];
            params.push(JSON.stringify(areasArray));
        }

        if (updates.expiresAt !== undefined) {
            fields.push('expiresAt = ?');
            params.push(updates.expiresAt);
        }

        if (fields.length === 0) {
            throw new Error('No fields to update');
        }

        params.push(alertId);
        const query = `UPDATE PublicHealthAlert SET ${fields.join(', ')} WHERE alertId = ?`;

        try {
            const [result] = await db.execute(query, params);
            if (result.affectedRows === 0) return null;
            return await this.getById(alertId);
        } catch (error) {
            throw error;
        }
    }

    // Expire an alert immediately
    static async expire(alertId) {
        const query = 'UPDATE PublicHealthAlert SET expiresAt = NOW() WHERE alertId = ?';

        try {
            const [result] = await db.execute(query, [alertId]);
            if (result.affectedRows === 0) return false;
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Delete alert (hard delete)
    static async delete(alertId) {
        const query = 'DELETE FROM PublicHealthAlert WHERE alertId = ?';

        try {
            const [result] = await db.execute(query, [alertId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Get alert statistics
    static async getStatistics() {
        const query = `
            SELECT 
                severity,
                COUNT(*) as total,
                SUM(CASE WHEN expiresAt IS NULL OR expiresAt > NOW() THEN 1 ELSE 0 END) as active,
                SUM(CASE WHEN expiresAt IS NOT NULL AND expiresAt <= NOW() THEN 1 ELSE 0 END) as expired
            FROM PublicHealthAlert
            GROUP BY severity
            ORDER BY 
                FIELD(severity, 'Critical', 'High', 'Medium', 'Low')
        `;

        try {
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get recent alerts (last N days)
    static async getRecent(days = 7) {
        const query = `
            SELECT * FROM PublicHealthAlert 
            WHERE issuedAt >= DATE_SUB(NOW(), INTERVAL ? DAY)
            ORDER BY severity DESC, issuedAt DESC
        `;

        try {
            const [rows] = await db.execute(query, [days]);
            return rows.map(row => ({
                ...row,
                affectedAreas: this.safeJSONParse(row.affectedAreas),
                isActive: !row.expiresAt || new Date(row.expiresAt) > new Date()
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PublicHealthAlert;