const express = require("express");
const router = express.Router();
const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordsByPatientId,
} = require("../controllers/medicalRecordController");

// Route to get all medical records
router.get("/medical-records", getAllMedicalRecords);

// Route to get medical records by patient ID
router.get("/medical-records/patient/:patientId", getMedicalRecordsByPatientId);

// Route to create a new medical record
router.post("/medical-records", createMedicalRecord);

module.exports = router;
