const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class Invoice {
  // Create a new invoice record
  static async create(invoiceData) {
    const {
      sponsorshipId,
      patientId,
      donorId,
      amount,
      description,
      invoiceFile,
    } = invoiceData;

    // Check sponsorship exists and matches patient & donor
    const [rows] = await db.execute(
      "SELECT * FROM sponsorship WHERE sponsorshipId = ?",
      [sponsorshipId]
    );

    // Check if donor transact donation for this sponsorship
    const [transactionRows] = await db.execute(
      "SELECT * FROM transaction WHERE sponsorshipId = ? AND donorId = ?",
      [sponsorshipId, donorId]
    );

    if (rows.length === 0) {
      throw new Error("Sponsorship does not exist");
    }

    if (transactionRows.length === 0) {
      throw new Error("Donor has not made a transaction for this sponsorship");
    }

    const sponsorship = rows[0];
    const transaction = transactionRows[0];

    // Validate amount
    if (amount > transaction.amount) {
      throw new Error("Invoice amount cannot exceed the transaction amount");
    }

    // Validate patient match
    if (sponsorship.patientId !== patientId) {
      throw new Error("patientId does not match the sponsorship record");
    }

    // Validate donor match
    if (transaction.donorId !== donorId) {
      throw new Error("donorId does not match the transaction record");
    }

    // Insert invoice
    const invoiceId = uuidv4();
    const query = `
    INSERT INTO invoices (invoiceId, sponsorshipId, patientId, donorId, amount, description, invoiceFile)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
      invoiceId,
      sponsorshipId,
      patientId,
      donorId,
      amount,
      description,
      invoiceFile,
    ];

    const [result] = await db.execute(query, values);
    return result;
  }
}

module.exports = Invoice;
