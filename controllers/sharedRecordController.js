const SharedRecord = require("../models/sharedRecordModel");

// Create a new shared record
exports.SharedRecord = async (req, res) => {
  try {
    const shareData = req.body;
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
