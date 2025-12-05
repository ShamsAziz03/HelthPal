const express = require("express");
const router = express.Router();
const TranslationController = require("../../controllers/remoteMedicalConsultations/translationController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

router.get(
  "/translateMsg",
  authenticateToken,
  authorizeRole("Patient", "Doctor"),
  TranslationController.translateMsg
);
router.get(
  "/chatTraslateHistory/:chatId",
  authenticateToken,
  authorizeRole("Patient", "Doctor"),
  TranslationController.getChatTranslationLogs
);

module.exports = router;
