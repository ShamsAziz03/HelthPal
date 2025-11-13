const db = require('../config/db');

class HealthEducation {

    static async create(alertData) {
        const { alertId, title, description, severity, affectedAreas, expiresAt } = alertData;

        if (!alertId) {
            throw new Error('alertId is required');
        }

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

    // Filtered retrieval of health education alerts 
    static async getAll(filters = {}) {
        let query = 'SELECT * FROM HealthEducation WHERE 1=1';
        const params = [];

        if (filters.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }

        if (filters.language) {
            query += ' AND language = ?';
            params.push(filters.language);
        }

        if (filters.search) {
            query += ' AND (title LIKE ? OR content LIKE ?)';
            params.push(`%${filters.search}%`, `%${filters.search}%`);
        }

        query += ' ORDER BY publishedDate DESC';

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
                mediaFiles: row.mediaFiles ? JSON.parse(row.mediaFiles) : []
            }));
        } catch (error) {
            throw error;
        }
    }

}