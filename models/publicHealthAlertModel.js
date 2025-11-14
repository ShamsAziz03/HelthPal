const db = require('../config/db');

class PublicHealthAlert {

    static safeJSONParse(jsonString) {
        if (!jsonString) return [];

        // If it's already an array, return it
        if (Array.isArray(jsonString)) return jsonString;

        // If it's not a string, return empty array
        if (typeof jsonString !== 'string') return [];

        try {
            const parsed = JSON.parse(jsonString);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch (error) {
            console.warn('Invalid JSON in mediaFiles:', jsonString);
            return [jsonString];
        }
    }

    static async create(contentData) {
        const {
            contentId,
            title,
            content,
            category,
            mediaFiles,
            language
        } = contentData;

        const query = `
            INSERT INTO HealthEducation
            (contentId, title, content, category, mediaFiles, language, publishedDate)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;

        // Ensure mediaFiles is stored as JSON array
        let mediaFilesJson = null;
        if (mediaFiles) {
            if (Array.isArray(mediaFiles)) {
                mediaFilesJson = JSON.stringify(mediaFiles);
            } else if (typeof mediaFiles === 'string') {
                try {
                    JSON.parse(mediaFiles);
                    mediaFilesJson = mediaFiles;
                } catch {
                    mediaFilesJson = JSON.stringify([mediaFiles]);
                }
            } else {
                mediaFilesJson = JSON.stringify([mediaFiles]);
            }
        }

        try {
            await db.execute(query, [
                contentId,
                title,
                content,
                category,
                mediaFilesJson,
                language || 'Arabic'
            ]);

            return { contentId, ...contentData, publishedDate: new Date() };
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