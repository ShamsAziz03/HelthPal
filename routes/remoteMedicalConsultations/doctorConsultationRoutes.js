const express = require("express");
const router = express.Router();
const doctorConsultationController = require("../../controllers/remoteMedicalConsultations/doctorConsultationController");

// Equipment Routes
router.get("/getAllDrs", doctorConsultationController.getAllDoctors);
router.get("/searchDoctorByNameId", doctorConsultationController.searchDoctorByNameId);
router.get("/searchDrByStatusSepcialityNameDate", doctorConsultationController.searchDoctorByStatusSepcialityNameDate);

module.exports = router;
