const express = require("express");
const router = express.Router();
const SessionController = require("../../controllers/remoteMedicalConsultations/sessionController");

router.get("/createRoom",SessionController.createRoom);

module.exports = router;