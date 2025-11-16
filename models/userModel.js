const db = require("../config/db");
const Patient = require("./patientModel");
const Donor = require("./donorModel");
const Doctor = require("./doctorModel");
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

    if (role === "patient") {
      await Patient.create({
        userId,
        medicalHistory,
        bloodType,
        dateOfBirth,
        address,
        consentGiven,
      });
    } else if (role === "donor") {
      await Donor.create({
        userId,
        totalDonated: 0,
        sponsorshipsCount: 0,
      });
    } else if (role === "doctor") {
      await Doctor.create({
        userId,
        specialty: null,
        licenseNumber: null,
        languages: [],
        yearsOfExperience: 0,
        isVerified: false,
        rating: null,
      });
    }

    return { userId, ...userData };
  }

  // Get a user by ID with role-specific details
  static async findById(userId) {
    const [users] = await db.execute("SELECT * FROM user WHERE userId = ?", [
      userId,
    ]);
    if (!users.length) return null;

    const user = users[0];
    let query = "";
    let values = [userId];

    if (user.role.toLowerCase() === "patient") {
      query = `
      SELECT u.*, p.patientId, p.medicalHistory, p.bloodType, p.dateOfBirth, p.address, p.consentGiven
      FROM user u
      JOIN patient p ON u.userId = p.userId
      WHERE u.userId = ?
    `;
    } else if (user.role.toLowerCase() === "doctor") {
      query = `
      SELECT u.*, d.doctorId, d.specialty, d.licenseNumber, d.languages, d.yearsOfExperience, d.isVerified, d.rating
      FROM user u
      JOIN doctor d ON u.userId = d.userId
      WHERE u.userId = ?
    `;
    } else if (user.role.toLowerCase() === "donor") {
      query = `
      SELECT u.*, dr.donorId, dr.totalDonated, dr.sponsorshipsCount
      FROM user u
      JOIN donor dr ON u.userId = dr.userId
      WHERE u.userId = ?
    `;
    } else {
      return user;
    }

    const [rows] = await db.execute(query, values);
    return rows[0];
  }
}

module.exports = User;
