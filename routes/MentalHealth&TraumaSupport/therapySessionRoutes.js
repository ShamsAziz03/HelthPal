const express = require("express");
const router = express.Router();
const {
  createTherapySession,
  getAllTherapySessions,
  getTherapySessionById,
  updateTherapySession,
  getTherapySessionsByTherapistId,
  deleteTherapySession,
} = require("../../controllers/MentalHealth&TraumaSupport/therapySessionController");

// Route for creating a new therapy session
router.post("/", createTherapySession);

// Route for getting all therapy sessions
router.get("/", getAllTherapySessions);

// Route for getting a single therapy session by ID
router.get("/:sessionId", getTherapySessionById);

// Route for updating a therapy session by ID
router.put("/:sessionId", updateTherapySession);

// Route for getting therapy sessions by therapist ID
router.get("/therapist/:therapistId", getTherapySessionsByTherapistId);

// Route for deleting a therapy session by ID
router.delete("/:sessionId", deleteTherapySession);

module.exports = router;
