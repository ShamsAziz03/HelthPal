const express = require("express");
const router = express.Router();
const SessionController = require("../../controllers/remoteMedicalConsultations/sessionController");

router.get("/createRoom", SessionController.createRoom);
router.get("/getSessionInfo/:sessionId", SessionController.getSessionInfo);
router.delete("/deleteSession/:sessionId", SessionController.deleteSession);

module.exports = router;
