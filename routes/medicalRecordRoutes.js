const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecordController");

// Route to create a new medical record
router.post("/medical-records", medicalRecordController.createMedicalRecord);

module.exports = router;
