const express = require("express");
const router = express.Router();
const {
  createMedicalRecord,
  getAllMedicalRecords,
} = require("../controllers/medicalRecordController");

// Route to get all medical records
router.get("/medical-records", getAllMedicalRecords);

// Route to create a new medical record
router.post("/medical-records", createMedicalRecord);

module.exports = router;
