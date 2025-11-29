const express = require("express");
const router = express.Router();
const TranslationController = require("../../controllers/remoteMedicalConsultations/translationController");

router.get("/translateMsg",TranslationController.translateMsg);


module.exports = router;
