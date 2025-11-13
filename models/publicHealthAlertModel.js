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




}