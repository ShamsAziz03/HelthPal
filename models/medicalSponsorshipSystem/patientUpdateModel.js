const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class PatientUpdate {
  // Create a new patient update record
  static async create(updateData) {
    const { sponsorshipId, patientId, updateText } = updateData;
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
}

module.exports = PatientUpdate;
