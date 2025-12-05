const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class PatientUpdate {
  // Create a new patient update record
  static async create(updateData) {
    const { sponsorshipId, patientId, updateText } = updateData;

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

    const updateId = uuidv4();
    const updateDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const query = `INSERT INTO patient_updates (updateId, sponsorshipId, patientId, updateText)
                   VALUES (?, ?, ?, ?)`;
    const values = [updateId, sponsorshipId, patientId, updateText];
    const [result] = await db.execute(query, values);
    return result;
  }

  //Get all patient updates
  static async findAll() {
    const query = "SELECT * FROM patient_updates";
    const [rows] = await db.execute(query);
    return rows;
  }

  //Get a patient update by its ID
  static async findById(updateId) {
    const query = "SELECT * FROM patient_updates WHERE updateId = ?";
    const [rows] = await db.execute(query, [updateId]);
    return rows[0];
  }

  // Get all updates for a specific sponsorship
  static async getBySponsorship(sponsorshipId) {
    const sql = `SELECT * FROM patient_updates WHERE sponsorshipId = ? ORDER BY updateDate DESC`;
    const [rows] = await db.execute(sql, [sponsorshipId]);
    return rows;
  }

  // Get all updates for a specific patient
  static async getByPatient(patientId) {
    const sql = `SELECT * FROM patient_updates WHERE patientId = ? ORDER BY updateDate DESC`;
    const [rows] = await db.execute(sql, [patientId]);
    return rows;
  }

  // Update an existing patient update
  static async update(updateId, updateData) {
    const { updateText } = updateData;
    const query = `UPDATE patient_updates SET updateText = ? WHERE updateId = ?`;
    const values = [updateText, updateId];
    const [result] = await db.execute(query, values);
    return result;
  }

  // Delete a patient update
  static async delete(updateId) {
    const query = `DELETE FROM patient_updates WHERE updateId = ?`;
    const [result] = await db.execute(query, [updateId]);
    return result;
  }
}

module.exports = PatientUpdate;
