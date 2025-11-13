const db = require('../config/db');
class PublicHealthAlert {

    static async create(alertData) {
        const { alertId, title, description, severity, affectedAreas, expiresAt } = alertData;

        const query = `
      INSERT INTO PublicHealthAlert 
      (alertId, title, description, severity, affectedAreas, issuedAt, expiresAt)
      VALUES (?, ?, ?, ?, ?, NOW(), ?)
    `;

        const affectedAreasJson = affectedAreas ? JSON.stringify(affectedAreas) : null;

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

    // get all active public health alerts with optional filteers 
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
                affectedAreas: row.affectedAreas ? JSON.parse(row.affectedAreas) : []
            }));
        } catch (error) {
            throw error;
        }
    }

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
                affectedAreas: row.affectedAreas ? JSON.parse(row.affectedAreas) : [],
                isActive: !row.expiresAt || new Date(row.expiresAt) > new Date()
            }));
        } catch (error) {
            throw error;
        }
    }

    static async getById(alertId) {
        const query = 'SELECT * FROM PublicHealthAlert WHERE alertId = ?';

        try {
            const [rows] = await db.execute(query, [alertId]);
            if (rows.length === 0) return null;

            const alert = rows[0];
            return {
                ...alert,
                affectedAreas: alert.affectedAreas ? JSON.parse(alert.affectedAreas) : [],
                isActive: !alert.expiresAt || new Date(alert.expiresAt) > new Date()
            };
        } catch (error) {
            throw error;
        }
    }

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
                affectedAreas: row.affectedAreas ? JSON.parse(row.affectedAreas) : []
            }));
        } catch (error) {
            throw error;
        }
    }

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
                affectedAreas: row.affectedAreas ? JSON.parse(row.affectedAreas) : []
            }));
        } catch (error) {
            throw error;
        }
    }

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
            params.push(JSON.stringify(updates.affectedAreas));
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






}