const express = require("express");
const router = express.Router();
const doctorConsultationController = require("../../controllers/remoteMedicalConsultations/doctorConsultationController");

// Equipment Routes
router.get("/getAllDrs", doctorConsultationController.getAllDoctors);

module.exports = router;
