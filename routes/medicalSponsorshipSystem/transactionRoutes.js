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
} = require("../../controllers/medicalSponsorshipSystem/transactionController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

// require authentication for all transaction routes
router.use(authenticateToken);

// Route for creating a new transaction
router.post("/", authorizeRole("Admin"), createTransaction);

// Route for getting all transactions
router.get("/", authorizeRole("Admin"), getAllTransactions);

// Route for getting a single transaction by ID
router.get(
  "/:transactionId",
  authorizeRole("Admin", "Donor"),
  getTransactionById
);

// Route for getting transactions by sponsorship ID
router.get(
  "/transaction/:sponsorshipId",
  authorizeRole("Admin", "Donor"),
  getTransactionsBySponsorshipId
);

// Route for getting donor donation history
router.get(
  "/donor/:donorId/history",
  authorizeRole("Admin", "Donor"),
  getDonorHistory
);

// Route for getting full sponsorship report
router.get(
  "/sponsorship/:sponsorshipId/report",
  authorizeRole("Admin"),
  getFullSponsorshipReport
);

// Route for deleting a transaction
router.delete("/:transactionId", authorizeRole("Admin"), deleteTransaction);

module.exports = router;
