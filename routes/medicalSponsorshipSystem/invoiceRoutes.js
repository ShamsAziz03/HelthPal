const express = require("express");
const router = express.Router();
const {
  createInvoice,
} = require("../../controllers/medicalSponsorshipSystem/invoiceController");

// Route for creating a new invoice
router.post("/", createInvoice);

module.exports = router;
