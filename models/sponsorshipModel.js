const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Sponsorship {
  // Create a new sponsorship record
  static async create(sponsorshipData) {
    const {
      patientId,
      donorId,
      treatmentType,
      goalAmount,
      currentAmount,
      status,
      createdAt,
    } = sponsorshipData;
    const sponsorshipId = uuidv4();

    const query = `INSERT INTO sponsorship (sponsorshipId, patientId, donorId, treatmentType, goalAmount, currentAmount, status, createdAt)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      sponsorshipId,
      patientId,
      donorId,
      treatmentType,
      goalAmount,
      currentAmount,
      status,
      createdAt,
    ];
    const [result] = await db.execute(query, values);
    return result;
  }

  // get all sponsorships
  static async findAll() {
    const query = "SELECT * FROM sponsorship";
    const [rows] = await db.execute(query);
    return rows;
  }

  // Find a sponsorship by its ID
  static async findById(sponsorshipId) {
    const query = "SELECT * FROM sponsorship WHERE sponsorshipId = ?";
    const [rows] = await db.execute(query, [sponsorshipId]);
    return rows[0];
  }

  // Update sponsorship
  static async update(sponsorshipId, data) {
    const { currentAmount, status } = data;
    const query =
      "UPDATE sponsorship SET currentAmount = ?, status = ? WHERE sponsorshipId = ?";
    const [result] = await db.execute(query, [
      currentAmount,
      status,
      sponsorshipId,
    ]);
    return result;
  }

  // Delete a sponsorship record
  static async delete(sponsorshipId) {
    const query = "DELETE FROM sponsorship WHERE sponsorshipId = ?";
    const [result] = await db.execute(query, [sponsorshipId]);
    return result;
  }
}

module.exports = Sponsorship;
