const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class PatientFeedback {
  static async create(data) {
    const { patientId, sponsorshipId, rating, message } = data;
    const feedbackId = uuidv4();

    const sql = `
      INSERT INTO patient_feedback (feedbackId, patientId, sponsorshipId, rating, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.execute(sql, [
      feedbackId,
      patientId,
      sponsorshipId,
      rating,
      message,
    ]);
  }

  static async getFeedbacksBySponsorshipId(sponsorshipId) {
    const sql = `SELECT * FROM patient_feedback WHERE sponsorshipId = ?`;
    const [rows] = await db.execute(sql, [sponsorshipId]);
    return rows;
  }
}

module.exports = PatientFeedback;
