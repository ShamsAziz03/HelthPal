const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Patient {
  // Create a new patient record
  static async create(patientData) {
    if (!patientData.userId) {
      throw new Error("userId is required for creating a patient record");
    }

    const {
      userId,
      medicalHistory = null,
      bloodType = null,
      dateOfBirth = null,
      address = null,
      consentGiven = false,
    } = patientData;

    const patientId = uuidv4();
    console.log("Patient Data Received:", patientData);
    const query = `INSERT INTO patient (patientId, userId, medicalHistory, bloodType, dateOfBirth, address, consentGiven)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      patientId,
      userId,
      medicalHistory,
      bloodType,
      dateOfBirth,
      address,
      consentGiven,
    ];
    const [result] = await db.execute(query, values);
    return result;
  }
}

module.exports = Patient;
