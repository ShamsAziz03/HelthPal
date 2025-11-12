const express = require("express");
const router = express.Router();
const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordsByPatientId,
  getMedicalRecordById,
  updateMedicalRecord,
} = require("../controllers/medicalRecordController");

// Route to get all medical records
router.get("/medical-records", getAllMedicalRecords);

// Route to get medical records by patient ID
router.get("/medical-records/patient/:patientId", getMedicalRecordsByPatientId);

// Route to get a medical record by ID
router.get("/medical-records/:recordId", getMedicalRecordById);

// Route to create a new medical record
router.post("/medical-records", createMedicalRecord);

// Route to update a medical record
router.put("/medical-records/:recordId", updateMedicalRecord);

module.exports = router;
