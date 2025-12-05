const express = require("express");
const router = express.Router();
const chatConsultationController = require("../../controllers/remoteMedicalConsultations/chatConsultationController");

router.post("/sendMsg",chatConsultationController.sendConsultationChatMsg);
router.get("/getConsultationMsgs/:consultationId",chatConsultationController.getConsultationChatMsgs);


module.exports = router;