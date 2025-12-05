const Transaction = require("../../models/MedicalSponsorshipSystem/transactionModel");
const currencyConversion = require("../../services/currencyConversion");
const convertToILS =
  currencyConversion.convertToILS || currencyConversion.convertUSDToILS;

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    console.log("Creating transaction with data:", req.body);

    const data = req.body;
    if (
      !data.donorId ||
      !data.sponsorshipId ||
      !data.amount ||
      !data.paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message:
          "donorId, sponsorshipId, amount, and paymentMethod are required",
      });
    }

    const fromCurrency = data.currency || "USD"; // default USD
    const amountILS = await convertToILS(data.amount, fromCurrency);

    if (!amountILS && amountILS !== 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to convert currency to ILS",
      });
    }

    data.amountILS = amountILS;

    const newTransaction = await Transaction.create(data);

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: {
        ...newTransaction,
        amountILS,
      },
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      success: false,
      message: "Error creating transaction",
      error: error.message,
    });
  }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();

    const enhanced = await Promise.all(
      transactions.map(async (t) => {
        let ils = null;
        try {
          ils = await convertToILS(t.amount, t.currency || "USD");
        } catch (err) {
          console.error(
            `Conversion error for transaction ${t.transactionId}:`,
            err.message || err
          );
          ils = null;
        }
        return { ...t, amountILS: ils };
      })
    );

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: enhanced, // return converted results
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching transactions",
      error: error.message,
    });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const amountILS = await convertToILS(
      transaction.amount,
      transaction.currency || "USD"
    );
    transaction.amountILS = amountILS;

    res.status(200).json({
      success: true,
      data: {
        ...transaction,
        amountILS: amountILS,
      },
    });
  } catch (error) {
    console.error("Error fetching transaction by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching transaction by ID",
      error: error.message,
    });
  }
};

// Get transactions by sponsorship ID
exports.getTransactionsBySponsorshipId = async (req, res) => {
  try {
    const { sponsorshipId } = req.params;
    const transactions = await Transaction.findBySponsorshipId(sponsorshipId);
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions by sponsorship ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching transactions by sponsorship ID",
      error: error.message,
    });
  }
};

// Get donor donation history
exports.getDonorHistory = async (req, res) => {
  try {
    const { donorId } = req.params;
    const history = await Transaction.getDonorHistory(donorId);
    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error("Error fetching donor history:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching donor history",
      error: error.message,
    });
  }
};

// transperency dashboard
exports.getFullSponsorshipReport = async (req, res) => {
  try {
    const { sponsorshipId } = req.params;
    const report = await Transaction.getFullSponsorshipReport(sponsorshipId);
    res.status(200).json({
      success: true,
      count: report.length,
      data: report,
    });
  } catch (error) {
    console.error("Error fetching sponsorship report:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching sponsorship report",
      error: error.message,
    });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const result = await Transaction.delete(transactionId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting transaction",
      error: error.message,
    });
  }
};
