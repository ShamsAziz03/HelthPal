const db = require("../config/db");
const Patient = require("./patientModel");
const { v4: uuidv4 } = require("uuid");

class User {
  // Create a new user record
  static async create(userData) {
    const {
      email,
      password,
      fullName,
      phoneNumber,
      role,
      createdAt,
      lastLogin,
      medicalHistory,
      bloodType,
      dateOfBirth,
      address,
      consentGiven,
    } = userData;

    const userId = uuidv4();
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");

    const query = `INSERT INTO user (userId, email, password, fullName, phoneNumber, role, createdAt, lastLogin)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      userId,
      email,
      password,
      fullName,
      phoneNumber,
      role,
      createdAt || formattedDate,
      lastLogin || formattedDate,
    ];

    const [result] = await db.execute(query, values);

    // create a patient record if the user is a patient
    if (role === "patient") {
      await Patient.create({
        userId,
        medicalHistory,
        bloodType,
        dateOfBirth,
        address,
        consentGiven,
      });
    }

    return { userId, ...userData };
  }
}

module.exports = User;
