const Invoice = require("../../models/medicalSponsorshipSystem/invoiceModel");

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

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching invoices",
      error: error.message,
    });
  }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    console.error("Error fetching invoice by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching invoice by ID",
      error: error.message,
    });
  }
};

// Delete invoice by ID
exports.deleteInvoiceById = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const deleted = await Invoice.delete(invoiceId);
    if (!deleted) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting invoice by ID",
      error: error.message,
    });
  }
};
