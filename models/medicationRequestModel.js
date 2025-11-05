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

    // Update medication request status
    static async updateStatus(requestId, status, ngoId = null) {
        const query = `
            UPDATE MedicationRequest 
            SET status = ?, ngoId = ? 
            WHERE requestId = ?
        `;

        const [result] = await db.execute(query, [status, ngoId, requestId]);
        return result.affectedRows > 0;
    }

    // Get all medication requests
    static async findAll() {
        const query = `
            SELECT mr.*, p.userId, u.fullName as patientName
            FROM MedicationRequest mr
            JOIN Patient p ON mr.patientId = p.patientId
            JOIN User u ON p.userId = u.userId
            ORDER BY mr.requestDate DESC
        `;

        const [requests] = await db.execute(query);
        return requests;
    }

    // Get medication requests by patient ID
    static async findByPatientId(patientId) {
        const query = `
            SELECT * FROM MedicationRequest 
            WHERE patientId = ? 
            ORDER BY requestDate DESC
        `;

        const [requests] = await db.execute(query, [patientId]);
        return requests;
    }

    // Get medication request by ID
    static async findById(requestId) {
        const query = `
            SELECT mr.*, p.userId, u.fullName as patientName
            FROM MedicationRequest mr
            JOIN Patient p ON mr.patientId = p.patientId
            JOIN User u ON p.userId = u.userId
            WHERE mr.requestId = ?
        `;

        const [requests] = await db.execute(query, [requestId]);
        return requests[0] || null;
    }

    // Get medication requests by urgency
    static async findByUrgency(urgency) {
        const query = `
            SELECT mr.*, p.userId, u.fullName as patientName
            FROM MedicationRequest mr
            JOIN Patient p ON mr.patientId = p.patientId
            JOIN User u ON p.userId = u.userId
            WHERE mr.urgency = ?
            ORDER BY mr.requestDate DESC
        `;

        const [requests] = await db.execute(query, [urgency]);
        return requests;
    }







}

module.exports = MedicationRequestModel;