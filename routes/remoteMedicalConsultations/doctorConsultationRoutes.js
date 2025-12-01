const express = require("express");
const router = express.Router();
const doctorConsultationController = require("../../controllers/remoteMedicalConsultations/doctorConsultationController");

// Equipment Routes
router.get("/getAllDrs", doctorConsultationController.getAllDoctors);
router.get("/searchDoctorByNameId", doctorConsultationController.searchDoctorByNameId);
router.get("/searchDrByStatusSepcialityNameDate", doctorConsultationController.searchDoctorByStatusSepcialityNameDate);
router.get("/getDoctorSchedule/:doctorId",doctorConsultationController.getDoctorSchedule);
router.get("/getAvailableDoctors",doctorConsultationController.getDoctorsAvailable);
router.post("/addDoctorAvailableTime",doctorConsultationController.addDoctorAvailableTime);
router.delete("/deleteDoctorAppointment/:drAvailabilityId",doctorConsultationController.deleteDoctorappointment);
router.put("/updateAppointmentSatatus",doctorConsultationController.updateAppointmentStatus);

module.exports = router;
