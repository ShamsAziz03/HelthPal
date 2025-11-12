const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class MedicalRecord {
  // Create a new medical record
  static async create(medicalRecordData) {
    const {
      patientId,
      doctorId,
      diagnosis,
      treatment,
      attachments,
      recordDate,
    } = medicalRecordData;
    const recordId = uuidv4();
    const query = `INSERT INTO medicalrecord (recordId, patientId, doctorId, diagnosis, treatment, attachments, recordDate)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      recordId,
      patientId,
      doctorId,
      diagnosis,
      treatment,
      JSON.stringify(attachments || []),
      recordDate || new Date(),
    ];
    const [result] = await db.execute(query, values);
    return result;
  }
}

module.exports = MedicalRecord;
