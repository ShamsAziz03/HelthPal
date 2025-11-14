const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
} = require("../controllers/transactionController");

// Route for creating a new transaction
router.post("/", createTransaction);

// Route for getting all transactions
router.get("/", getAllTransactions);

module.exports = router;
