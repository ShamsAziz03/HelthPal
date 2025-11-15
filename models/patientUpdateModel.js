const db = require("../config/db");
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
}

module.exports = PatientUpdate;
