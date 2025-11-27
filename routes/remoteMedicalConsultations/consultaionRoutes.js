const express = require("express");
const router = express.Router();
const consultationController = require("../../controllers/remoteMedicalConsultations/consultationController");

router.delete("/deleteConsultation/:consultationId",consultationController.deleteCosultation);


module.exports = router;