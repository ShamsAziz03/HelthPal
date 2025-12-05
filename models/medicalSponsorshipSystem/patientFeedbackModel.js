const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class PatientFeedback {
  static async create(data) {
    const { patientId, sponsorshipId, rating, message } = data;
    const feedbackId = uuidv4();

    // Validate required fields
    if (!sponsorshipId) throw new Error("sponsorshipId is required");
    if (!patientId) throw new Error("patientId is required");

    // Ensure the sponsorship exists and belongs to the provided patientId
    const checkSql = `SELECT patientId FROM sponsorship WHERE sponsorshipId = ?`;
    const [rows] = await db.execute(checkSql, [sponsorshipId]);
    if (!rows || rows.length === 0) {
      throw new Error("Sponsorship not found");
    }
    const sponsorshipPatientId = rows[0].patientId;
    if (sponsorshipPatientId !== patientId) {
      throw new Error(
        "Provided patientId does not match the sponsorship's patientId"
      );
    }

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
    const sponsorshipExistsSql = `SELECT sponsorshipId FROM sponsorship WHERE sponsorshipId = ?`;
    const [sponsorshipRows] = await db.execute(sponsorshipExistsSql, [
      sponsorshipId,
    ]);
    if (sponsorshipRows.length === 0) {
      throw new Error("Sponsorship does not exist");
    }
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
