const express = require("express");
const router = express.Router();
const doctorConsultationController = require("../../controllers/remoteMedicalConsultations/doctorConsultationController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

// Equipment Routes
router.get(
  "/getAllDrs",
  authenticateToken,
  authorizeRole("Admin", "Patient", "Doctor"),
  doctorConsultationController.getAllDoctors
);
router.get(
  "/searchDoctorByNameId",
  authenticateToken,
  authorizeRole("Admin", "Patient", "Doctor"),
  doctorConsultationController.searchDoctorByNameId
);
router.get(
  "/searchDrByStatusSepcialityNameDate",
  authenticateToken,
  authorizeRole("Admin", "Patient"),
  doctorConsultationController.searchDoctorByStatusSepcialityNameDate
);
router.get(
  "/getDoctorSchedule/:doctorId",
  authenticateToken,
  authorizeRole("Admin", "Patient", "Doctor"),
  doctorConsultationController.getDoctorSchedule
);
router.get(
  "/getAvailableDoctors",
  authenticateToken,
  authorizeRole("Admin", "Patient", "Doctor"),
  doctorConsultationController.getDoctorsAvailable
);
router.post(
  "/addDoctorAvailableTime",
  authenticateToken,
  authorizeRole("Doctor"),
  doctorConsultationController.addDoctorAvailableTime
);
router.delete(
  "/deleteDoctorAppointment/:drAvailabilityId",
  authenticateToken,
  authorizeRole("Doctor"),
  doctorConsultationController.deleteDoctorappointment
);
router.put(
  "/updateAppointmentSatatus",
  authenticateToken,
  authorizeRole("Doctor"),
  doctorConsultationController.updateAppointmentStatus
);

module.exports = router;
