const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  getTransactionsBySponsorshipId,
  getDonorHistory,
  deleteTransaction,
  getFullSponsorshipReport,
} = require("../../controllers/MedicalSponsorshipSystem/transactionController");

// Route for creating a new transaction
router.post("/", createTransaction);

// Route for getting all transactions
router.get("/", getAllTransactions);

// Route for getting a single transaction by ID
router.get("/:transactionId", getTransactionById);

// Route for getting transactions by sponsorship ID
router.get("/transaction/:sponsorshipId", getTransactionsBySponsorshipId);

// Route for getting donor donation history
router.get("/donor/:donorId/history", getDonorHistory);

// Route for getting full sponsorship report
router.get("/sponsorship/:sponsorshipId/report", getFullSponsorshipReport);

// Route for deleting a transaction
router.delete("/:transactionId", deleteTransaction);

module.exports = router;
