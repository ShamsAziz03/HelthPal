const MedicalRecord = require("../models/medicalRecordModel");

// Create a new medical record
exports.createMedicalRecord = async (req, res) => {
  try {
    const medicalRecordData = req.body;
    const result = await MedicalRecord.create(medicalRecordData);
    res
      .status(201)
      .json({ message: "Medical record created successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating medical record", error: error.message });
  }
};
