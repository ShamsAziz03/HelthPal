const express = require("express");
const router = express.Router();
const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordsByPatientId,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../../controllers/MedicalSponsorshipSystem/medicalRecordController");

// Route to get all medical records
router.get("/", getAllMedicalRecords);

// Route to get medical records by patient ID
router.get("/patient/:patientId", getMedicalRecordsByPatientId);

// Route to get a medical record by ID
router.get("/:recordId", getMedicalRecordById);

// Route to create a new medical record
router.post("/", createMedicalRecord);

// Route to update a medical record
router.put("/:recordId", updateMedicalRecord);

// Route to delete a medical record
router.delete("/:recordId", deleteMedicalRecord);

module.exports = router;
