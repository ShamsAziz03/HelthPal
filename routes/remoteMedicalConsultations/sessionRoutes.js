const express = require("express");
const router = express.Router();
const SessionController = require("../../controllers/remoteMedicalConsultations/sessionController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

router.get(
  "/createRoom",
  authenticateToken,
  authorizeRole("Admin", "Doctor"),
  SessionController.createRoom
);
router.get(
  "/getSessionInfo/:sessionId",
  authenticateToken,
  authorizeRole("Admin", "Patient", "Doctor"),
  SessionController.getSessionInfo
);
router.delete(
  "/deleteSession/:sessionId",
  authenticateToken,
  authorizeRole("Admin", "Doctor"),
  SessionController.deleteSession
);

module.exports = router;
