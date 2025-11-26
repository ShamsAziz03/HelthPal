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

    const [doctors] = await db.execute(query);
    return doctors;
  }

  //to search on doctor info by name or id
  static async searchDrsByNameId(filters) {
    const { drId, drName } = filters;

    let query = `
            SELECT
   u.fullName,
      d.languages,
  d.rating, 
  d.yearsOfExperience,
  d.specialty
            FROM doctor d
			JOIN user u ON d.userId = u.userId
            WHERE 1=1
        `;
    const params = [];

    if (drId) {
      query += " AND d.doctorId= ?";
      params.push(drId);
    }
    if (drName) {
      query += " AND u.fullName LIKE ?";
      params.push(`%${drName}%`);
    }
    query += " ORDER BY u.fullName";

    const [doctors] = await db.execute(query, params);
    return doctors;
  }

  //to search on doctor info by name or availability(status) or speciality
  static async searchDrsByStatusSepcialityNameDate(filters) {
    const { drName, drStatus, drSpeciality, date } = filters;

    let query = `
    SELECT
   d.doctorId,
   u.fullName,
  d.rating, 
  d.specialty,
  da.startTime,
  da.endTime
            FROM doctor d
			JOIN user u ON d.userId = u.userId
            join doctoravailability da on d.doctorId=da.doctorId
            WHERE 1=1
        `;
    const params = [];

    if (drStatus) {
      query += " AND da.status= ?";
      params.push(drStatus);
    }

    if (drSpeciality) {
      query += " AND d.specialty LIKE ?";
      params.push(`%${drSpeciality}%`);
    }
    if (drName) {
      query += " AND u.fullName LIKE ?";
      params.push(`%${drName}%`);
    }
    if (date) {
      query += " AND da.startTime LIKE ?";
      params.push(`%${date}%`);
    }
    query += " ORDER BY u.fullName";

    const [doctors] = await db.execute(query, params);
    return doctors;
  }

  //to get dr schedule
  static async getDrSchedule(doctorId) {
    const query = `Select dr.doctorId, user.fullName, dr.specialty, dr.rating, doctoravailability.startTime,
     doctoravailability.endTime, doctoravailability.status from doctoravailability 
join doctor dr on doctoravailability.doctorId=dr.doctorId
join user on dr.userId=user.userId
where doctoravailability.doctorId=?`;
    const [result] = await db.execute(query, [doctorId]);
    return result;
  }
}

module.exports = Doctor;
