const SharedRecord = require("../../models/MedicalSponsorshipSystem/sharedRecordModel");

// Create a new shared record
exports.SharedRecord = async (req, res) => {
  try {
    const shareData = req.body;
    const { recordId, senderId, receiverId } = shareData;
    if (!recordId || !senderId || !receiverId) {
      return res.status(400).json({
        message: "recordId, senderId and receiverId are required",
      });
    }

    const result = await SharedRecord.create(shareData);
    res
      .status(201)
      .json({ message: "Record shared successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sharing record", error: error.message });
  }
};

// Get all shared records
exports.getAllSharedRecords = async (req, res) => {
  try {
    const records = await SharedRecord.findAll();
    res
      .status(200)
      .json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching shared records",
      error: error.message,
    });
  }
};

// Get shared records by receiver ID
exports.getSharedRecordsByReceiverId = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const records = await SharedRecord.findByReceiverId(receiverId);
    res
      .status(200)
      .json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching shared records for receiver",
      error: error.message,
    });
  }
};

// Delete a shared record by share ID
exports.deleteSharedRecord = async (req, res) => {
  try {
    const { shareId } = req.params;
    const result = await SharedRecord.delete(shareId);
    res
      .status(200)
      .json({ message: "Shared record deleted successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting shared record", error: error.message });
  }
};
