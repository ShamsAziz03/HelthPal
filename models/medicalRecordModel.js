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

  // Get all medical records
  static async findAll() {
    const query = "SELECT * FROM medicalrecord";
    const [rows] = await db.execute(query);
    return rows;
  }

  // Get all medical records for a specific patient
  static async findByPatientId(patientId) {
    const query = "SELECT * FROM medicalrecord WHERE patientId = ?";
    const [rows] = await db.execute(query, [patientId]);
    return rows;
  }

  // Get a medical record by ID
  static async findById(recordId) {
    const query = "SELECT * FROM medicalrecord WHERE recordId = ?";
    const [rows] = await db.execute(query, [recordId]);
    return rows[0];
  }

  // Update a medical record
  static async update(recordId, data) {
    const { diagnosis, treatment, attachments } = data;
    const query =
      "UPDATE medicalrecord SET diagnosis = ?, treatment = ?, attachments = ? WHERE recordId = ?";
    const [result] = await db.execute(query, [
      diagnosis,
      treatment,
      JSON.stringify(attachments || []),
      recordId,
    ]);
    return result;
  }
}

module.exports = MedicalRecord;
