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

  // Find sponsorships by patient ID
  static async findByPatientId(patientId) {
    const query = `
      SELECT s.*, u1.fullName AS patientName, u2.fullName AS donorName
      FROM sponsorship s
      LEFT JOIN user u1 ON s.patientId = u1.userId
      LEFT JOIN user u2 ON s.donorId = u2.userId
      WHERE s.patientId = ?
    `;
    const [rows] = await db.execute(query, [patientId]);
    return rows;
  }

  // Find sponsorships by donor ID
  static async findByDonorId(donorId) {
    const query = `
      SELECT s.*, u1.fullName AS patientName, u2.fullName AS donorName  
      FROM sponsorship s
      LEFT JOIN user u1 ON s.patientId = u1.userId
      LEFT JOIN user u2 ON s.donorId = u2.userId
      WHERE s.donorId = ?
    `;
    const [rows] = await db.execute(query, [donorId]);
    return rows;
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

  // Update sponsorship progress
  static async updateProgress(sponsorshipId, amount) {
    const query = `
      UPDATE sponsorship
      SET currentAmount = currentAmount + ?
      WHERE sponsorshipId = ?
    `;
    const [result] = await db.execute(query, [amount, sponsorshipId]);

    const checkQuery =
      "SELECT goalAmount, currentAmount FROM sponsorship WHERE sponsorshipId = ?";
    const [rows] = await db.execute(checkQuery, [sponsorshipId]);
    const { goalAmount, currentAmount } = rows[0];
    if (currentAmount == goalAmount) {
      const statusUpdateQuery =
        "UPDATE sponsorship SET status = 'completed' WHERE sponsorshipId = ?";
      await db.execute(statusUpdateQuery, [sponsorshipId]);
    } else if (currentAmount > goalAmount) {
      const statusUpdateQuery =
        "UPDATE sponsorship SET status = 'overfunded' WHERE sponsorshipId = ?";
      await db.execute(statusUpdateQuery, [sponsorshipId]);
    } else {
      const statusUpdateQuery =
        "UPDATE sponsorship SET status = 'Active' WHERE sponsorshipId = ?";
      await db.execute(statusUpdateQuery, [sponsorshipId]);
    }
    return { message: "Progress updated successfully" };
  }

  // Generate a basic report for sponsorship
  static async generateReport(sponsorshipId) {
    const query = `
      SELECT sponsorshipId, treatmentType, goalAmount, currentAmount, status,
             (currentAmount / goalAmount) * 100 AS progressPercentage,
             createdAt
      FROM sponsorship
      WHERE sponsorshipId = ?
    `;
    const [rows] = await db.execute(query, [sponsorshipId]);
    return rows[0];
  }

  // Delete a sponsorship record
  static async delete(sponsorshipId) {
    const query = "DELETE FROM sponsorship WHERE sponsorshipId = ?";
    const [result] = await db.execute(query, [sponsorshipId]);
    return result;
  }
}

module.exports = Sponsorship;
