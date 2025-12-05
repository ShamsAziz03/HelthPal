const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  deleteInvoiceById,
} = require("../../controllers/medicalSponsorshipSystem/invoiceController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

// Route for creating a new invoice
router.post("/", authenticateToken, authorizeRole("Admin"), createInvoice);

// Route for getting all invoices
router.get("/", authenticateToken, authorizeRole("Admin"), getAllInvoices);

// Route for getting a single invoice by ID
router.get(
  "/:invoiceId",
  authenticateToken,
  authorizeRole("Admin", "Donor", "Patient"),
  getInvoiceById
);

// Route for deleting an invoice by ID
router.delete(
  "/:invoiceId",
  authenticateToken,
  authorizeRole("Admin"),
  deleteInvoiceById
);

module.exports = router;
