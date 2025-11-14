const db = require("../config/db");
const sponsorshipModel = require("./sponsorshipModel");
const { v4: uuidv4 } = require("uuid");

class Transaction {
  // Create a new transaction record
  static async create(transactionData) {
    const { donorId, sponsorshipId, amount, paymentMethod, receipt } =
      transactionData;

    const transactionId = uuidv4();
    const transactionDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const query = `INSERT INTO transaction (transactionId, donorId ,sponsorshipId, amount, transactionDate, paymentMethod, receipt)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      transactionId,
      donorId,
      sponsorshipId,
      amount,
      transactionDate,
      paymentMethod,
      receipt,
    ];
    const [result] = await db.execute(query, values);
    // update sponsorship currentAmount
    sponsorshipModel.updateProgress(sponsorshipId, amount);
    return result;
  }

  // Get all transactions
  static async findAll() {
    const query = "SELECT * FROM transaction";
    const [rows] = await db.execute(query);
    return rows;
  }

  // Find a transaction by its ID
  static async findById(transactionId) {
    const query = "SELECT * FROM transaction WHERE transactionId = ?";
    const [rows] = await db.execute(query, [transactionId]);
    return rows[0];
  }

  // Find transactions by sponsorship ID
  static async findBySponsorshipId(sponsorshipId) {
    const query = "SELECT * FROM transaction WHERE sponsorshipId = ?";
    const [rows] = await db.execute(query, [sponsorshipId]);
    return rows;
  }

  // Delete a transaction record
  static async delete(transactionId) {
    const query = "DELETE FROM transaction WHERE transactionId = ?";
    const [result] = await db.execute(query, [transactionId]);
    return result;
  }
}

module.exports = Transaction;
