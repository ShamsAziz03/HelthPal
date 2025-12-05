const express = require("express");
const router = express.Router();
const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordsByPatientId,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../../controllers/medicalSponsorshipSystem/medicalRecordController");

// add auth middleware
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

// Route to get all medical records
router.get(
  "/",
  authenticateToken,
  authorizeRole("Admin", "Doctor"),
  getAllMedicalRecords
);

// Route to get medical records by patient ID
router.get(
  "/patient/:patientId",
  authenticateToken,
  authorizeRole("Admin", "Doctor", "Patient"),
  getMedicalRecordsByPatientId
);

// Route to get a medical record by ID
router.get(
  "/:recordId",
  authenticateToken,
  authorizeRole("Admin", "Doctor", "Patient"),
  getMedicalRecordById
);

// Route to create a new medical record
router.post(
  "/",
  authenticateToken,
  authorizeRole("Doctor", "Admin"),
  createMedicalRecord
);

// Route to update a medical record
router.put(
  "/:recordId",
  authenticateToken,
  authorizeRole("Doctor", "Admin"),
  updateMedicalRecord
);

// Route to delete a medical record
router.delete(
  "/:recordId",
  authenticateToken,
  authorizeRole("Admin"),
  deleteMedicalRecord
);

module.exports = router;
