const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  deleteInvoiceById,
} = require("../../controllers/medicalSponsorshipSystem/invoiceController");

// Route for creating a new invoice
router.post("/", createInvoice);

// Route for getting all invoices
router.get("/", getAllInvoices);

// Route for getting a single invoice by ID
router.get("/:invoiceId", getInvoiceById);

// Route for deleting an invoice by ID
router.delete("/:invoiceId", deleteInvoiceById);

module.exports = router;
