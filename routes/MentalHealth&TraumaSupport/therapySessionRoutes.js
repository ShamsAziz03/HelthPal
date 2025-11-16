const express = require("express");
const router = express.Router();
const {
  createTherapySession,
  getAllTherapySessions,
  getTherapySessionById,
  updateTherapySession,
} = require("../../controllers/MentalHealth&TraumaSupport/therapySessionController");

// Route for creating a new therapy session
router.post("/", createTherapySession);

// Route for getting all therapy sessions
router.get("/", getAllTherapySessions);

// Route for getting a single therapy session by ID
router.get("/:sessionId", getTherapySessionById);

// Route for updating a therapy session by ID
router.put("/:sessionId", updateTherapySession);

module.exports = router;
