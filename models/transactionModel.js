const db = require("../config/database");

class Transaction {
  // Create a new transaction record
  static async create(transactionData) {
    const {
      transactionId,
      sponsorshipId,
      donorId,
      amount,
      transactionDate,
      paymentMethod,
      receipt,
    } = transactionData;
    const query = `INSERT INTO transactions (transactionId, sponsorshipId, donorId, amount, transactionDate, paymentMethod, receipt)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      transactionId,
      sponsorshipId,
      donorId,
      amount,
      transactionDate,
      paymentMethod,
      receipt,
    ];
    const [result] = await db.execute(query, values);
    return result;
  }

  // Get all transactions
  static async findAll() {
    const query = "SELECT * FROM transactions";
    const [rows] = await db.execute(query);
    return rows;
  }

  // Find a transaction by its ID
  static async findById(transactionId) {
    const query = "SELECT * FROM transactions WHERE transactionId = ?";
    const [rows] = await db.execute(query, [transactionId]);
    return rows[0];
  }

  // Find transactions by sponsorship ID
  static async findBySponsorshipId(sponsorshipId) {
    const query = "SELECT * FROM transactions WHERE sponsorshipId = ?";
    const [rows] = await db.execute(query, [sponsorshipId]);
    return rows;
  }

  // Delete a transaction record
  static async delete(transactionId) {
    const query = "DELETE FROM transactions WHERE transactionId = ?";
    const [result] = await db.execute(query, [transactionId]);
    return result;
  }
}

module.exports = Transaction;
