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

  // Get feedbacks by sponsorship ID
  static async getFeedbacksBySponsorshipId(sponsorshipId) {
    const sql = `SELECT * FROM patient_feedback WHERE sponsorshipId = ?`;
    const [rows] = await db.execute(sql, [sponsorshipId]);
    return rows;
  }

  // Get all feedbacks
  static async getAllFeedbacks() {
    const sql = `SELECT * FROM patient_feedback`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Find feedback by its ID
  static async findById(feedbackId) {
    const sql = `SELECT * FROM patient_feedback WHERE feedbackId = ?`;
    const [rows] = await db.execute(sql, [feedbackId]);
    return rows[0];
  }

  // Delete feedback by its ID
  static async delete(feedbackId) {
    const sql = `DELETE FROM patient_feedback WHERE feedbackId = ?`;
    const [result] = await db.execute(sql, [feedbackId]);
    return result;
  }
}

module.exports = PatientFeedback;
