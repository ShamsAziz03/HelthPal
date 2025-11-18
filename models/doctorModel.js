const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Doctor {
  // Create a new doctor
  static async create(doctorData) {
    const {
      userId,
      specialty,
      licenseNumber,
      languages,
      yearsOfExperience,
      isVerified,
      rating,
    } = doctorData;
    const doctorId = uuidv4();
    const query = `INSERT INTO doctor (doctorId, userId, specialty, licenseNumber, languages, yearsOfExperience, isVerified, rating)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      doctorId,
      userId,
      specialty,
      licenseNumber,
      JSON.stringify(languages || []),
      yearsOfExperience,
      isVerified || false,
      rating || null,
    ];
    const [result] = await db.execute(query, values);
    return result;
  }

  //to get all drs
  static async getAllDrs() {
    const query = `
            SELECT
   u.fullName,
     d.specialty,
      d.languages,
  d.rating, 
  d.yearsOfExperience,
  d.isVerified
            FROM doctor d
			JOIN user u ON d.userId = u.userId
            ORDER BY u.fullName;
        `;

    const [doctor] = await db.execute(query);
    return doctor;
  }
}

module.exports = Doctor;
