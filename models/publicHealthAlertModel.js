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


}