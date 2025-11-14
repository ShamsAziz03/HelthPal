const Transaction = require("../models/transactionModel");

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    console.log("Creating transaction with data:", req.body);
    const transactionData = req.body;
    if (!transactionData.donorId || !transactionData.sponsorshipId || !transactionData.amount || !transactionData.paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "donorId, sponsorshipId, amount, and paymentMethod are required",
        });
    }
    const newTransaction = await Transaction.create(transactionData);
    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: newTransaction,
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
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
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
