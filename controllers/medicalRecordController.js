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

// Get all medical records
exports.getAllMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.findAll();
    res
      .status(200)
      .json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching medical records",
      error: error.message,
    });
  }
};

// Get medical records by patient ID
exports.getMedicalRecordsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const records = await MedicalRecord.findByPatientId(patientId);
    res
      .status(200)
      .json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching medical records for patient",
      error: error.message,
    });
  }
};
