const express = require("express");
const router = express.Router();
const chatConsultationController = require("../../controllers/remoteMedicalConsultations/chatConsultationController");

router.post("/sendMsg",chatConsultationController.sendConsultationChatMsg);

module.exports = router;