const Invoice = require("../models/invoiceModel");

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    console.log("Creating invoice with data:", req.body);
    const invoiceData = req.body;
    if (
      !invoiceData.sponsorshipId ||
      !invoiceData.patientId ||
      !invoiceData.donorId ||
      !invoiceData.amount ||
      !invoiceData.description ||
      !invoiceData.invoiceFile
    ) {
      return res.status(400).json({
        success: false,
        message:
          "sponsorshipId, patientId, donorId, amount, description, and invoiceFile are required",
      });
    }
    const newInvoice = await Invoice.create(invoiceData);
    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: newInvoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({
      success: false,
      message: "Error creating invoice",
      error: error.message,
    });
  }
};
