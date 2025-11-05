const db = require('../config/database');

class MedicationRequestModel {

    // Create a new medication request
    static async create(requestData) {
        const { patientId, medicationName, quantity, urgency } = requestData;
        const requestId = 'MED' + Date.now();

        const query = `
            INSERT INTO MedicationRequest 
            (requestId, patientId, medicationName, quantity, urgency, status) 
            VALUES (?, ?, ?, ?, ?, 'Pending')
        `;

        const [result] = await db.execute(query, [
            requestId,
            patientId,
            medicationName,
            quantity,
            urgency
        ]);

        return { requestId, ...requestData, status: 'Pending' };
    }
    // Get medication requests by status
    static async findByStatus(status) {
        const query = `
            SELECT mr.*, p.userId, u.fullName as patientName
            FROM MedicationRequest mr
            JOIN Patient p ON mr.patientId = p.patientId
            JOIN User u ON p.userId = u.userId
            WHERE mr.status = ?
            ORDER BY mr.requestDate DESC
        `;

        const [requests] = await db.execute(query, [status]);
        return requests;
    }


}

module.exports = MedicationRequestModel;