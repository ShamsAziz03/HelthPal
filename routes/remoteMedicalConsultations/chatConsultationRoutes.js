const express = require("express");
const router = express.Router();
const chatConsultationController = require("../../controllers/remoteMedicalConsultations/chatConsultationController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

router.post(
  "/sendMsg",
  authenticateToken,
  authorizeRole("Patient", "Doctor"),
  chatConsultationController.sendConsultationChatMsg
);
router.get(
  "/getConsultationMsgs/:consultationId",
  authenticateToken,
  authorizeRole("Patient", "Doctor"),
  chatConsultationController.getConsultationChatMsgs
);

module.exports = router;
