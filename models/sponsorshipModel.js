const db = require("../config/db");

class Sponsorship {
  // Create a new sponsorship record
  static async create(sponsorshipData) {
    const {
      sponsorshipId,
      patientId,
      donorId,
      treatmentType,
      goalAmount,
      currentAmount,
      status,
      createdAt,
    } = sponsorshipData;

    const query = `INSERT INTO sponsorships (sponsorshipId, patientId, donorId, treatmentType, goalAmount, currentAmount, status, createdAt)
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
    const query = "SELECT * FROM sponsorships";
    const [rows] = await db.execute(query);
    return rows;
  }

  // Find a sponsorship by its ID
  static async findById(sponsorshipId) {
    const query = "SELECT * FROM sponsorships WHERE sponsorshipId = ?";
    const [rows] = await db.execute(query, [sponsorshipId]);
    return rows[0];
  }

  // Update sponsorship
  static async update(sponsorshipId, data) {
    const { currentAmount, status } = data;
    const query =
      "UPDATE sponsorships SET currentAmount = ?, status = ? WHERE sponsorshipId = ?";
    const [result] = await db.execute(query, [
      currentAmount,
      status,
      sponsorshipId,
    ]);
    return result;
  }

  // Delete a sponsorship record
  static async delete(sponsorshipId) {
    const query = "DELETE FROM sponsorships WHERE sponsorshipId = ?";
    const [result] = await db.execute(query, [sponsorshipId]);
    return result;
  }
}

module.exports = Sponsorship;
