const express = require("express");
const router = express.Router();
const consultationController = require("../../controllers/remoteMedicalConsultations/consultationController");

router.delete("/deleteConsultation/:consultationId",consultationController.deleteCosultation);
router.put("/updateConsultationStatus",consultationController.updateStatus);
router.put("/updateConsultationNotes",consultationController.addNotes);
router.put("/updateConsultationPrescription",consultationController.addPrescription);
router.get("/getConsultationInfo/:consultationId",consultationController.getConsultationInfo);
router.get("/getPatientConsultations/:patientId",consultationController.getPatientConsultations);


module.exports = router;