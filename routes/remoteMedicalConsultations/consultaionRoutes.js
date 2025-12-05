const express = require("express");
const router = express.Router();
const consultationController = require("../../controllers/remoteMedicalConsultations/consultationController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

router.delete(
  "/deleteConsultation/:consultationId",
  authenticateToken,
  authorizeRole("Doctor"),
  consultationController.deleteCosultation
);
router.put(
  "/updateConsultationStatus",
  authenticateToken,
  authorizeRole("Doctor"),
  consultationController.updateStatus
);
router.put(
  "/updateConsultationNotes",
  authenticateToken,
  authorizeRole("Patient", "Doctor"),
  consultationController.addNotes
);
router.put(
  "/updateConsultationPrescription",
  authenticateToken,
  authorizeRole("Doctor"),
  consultationController.addPrescription
);
router.get(
  "/getConsultationInfo/:consultationId",
   authenticateToken,
  authorizeRole("Admin", "Patient", "Doctor"),
  consultationController.getConsultationInfo
);
router.get(
  "/getPatientConsultations/:patientId",
  authenticateToken,
  authorizeRole("Admin", "Patient"),
  consultationController.getPatientConsultations
);
router.get(
  "/getDoctorConsultations/:doctorId",
  authenticateToken,
  authorizeRole("Admin", "Patient", "Doctor"),
  consultationController.getDoctorConsultations
);
router.put(
  "/updateConsultationType",
  authenticateToken,
  authorizeRole("Doctor"),
  consultationController.updateType
);

module.exports = router;
