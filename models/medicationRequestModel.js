const db = require("../config/db");

class MedicationRequestModel {
  // Create a new medication request
  static async create(requestData) {
    const { patientId, medicationName, quantity, urgency } = requestData;
    const requestId = "MED" + Date.now();

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
      urgency,
    ]);

    return { requestId, ...requestData, status: "Pending" };
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

  //************************************** */
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
  static async filteringNGOsMedicationRequestsStatus(ngoId, status) {
    const query = `
            SELECT mr.*, p.userId, u.fullName as patientName
            FROM MedicationRequest mr
            JOIN Patient p ON mr.patientId = p.patientId
            JOIN User u ON p.userId = u.userId
            WHERE mr.ngoId = ? AND mr.status = ?
            ORDER BY mr.requestDate DESC
        `;

    const [requests] = await db.execute(query, [ngoId, status]);
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

  // Update entire medication request
  static async update(requestId, updateData) {
    const { medicationName, quantity, urgency, status, ngoId } = updateData;

    const query = `
            UPDATE MedicationRequest 
            SET medicationName = ?, quantity = ?, urgency = ?, status = ?, ngoId = ?
            WHERE requestId = ?
        `;

    const [result] = await db.execute(query, [
      medicationName,
      quantity,
      urgency,
      status,
      ngoId,
      requestId,
    ]);

    return result.affectedRows > 0;
  }

  // Delete medication request
  static async delete(requestId) {
    const query = "DELETE FROM MedicationRequest WHERE requestId = ?";
    const [result] = await db.execute(query, [requestId]);
    return result.affectedRows > 0;
  }

  // Get requests fulfilled by an NGO
  static async findByNGO(ngoId) {
    const query = `
            SELECT mr.*, p.userId, u.fullName as patientName
            FROM MedicationRequest mr
            JOIN Patient p ON mr.patientId = p.patientId
            JOIN User u ON p.userId = u.userId
            WHERE mr.ngoId = ?
            ORDER BY mr.requestDate DESC
        `;

    const [requests] = await db.execute(query, [ngoId]);
    return requests;
  }

  // Get statistics for dashboard
  static async getStatistics() {
    const query = `
            SELECT 
                COUNT(*) as totalRequests,
                SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pendingRequests,
                SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as inProgressRequests,
                SUM(CASE WHEN status = 'Fulfilled' THEN 1 ELSE 0 END) as fulfilledRequests,
                SUM(CASE WHEN urgency = 'High' THEN 1 ELSE 0 END) as highUrgencyRequests
            FROM MedicationRequest
        `;

    const [stats] = await db.execute(query);
    return stats[0];
  }
}

module.exports = MedicationRequestModel;
