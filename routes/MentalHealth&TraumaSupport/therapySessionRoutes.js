const express = require("express");
const router = express.Router();
const {
  createTherapySession,
  getAllTherapySessions,
  getTherapySessionById,
  updateTherapySession,
  getTherapySessionsByTherapistId,
  getTherapySessionsByPatientId,
  deleteTherapySession,
} = require("../../controllers/MentalHealth&TraumaSupport/therapySessionController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

// apply authentication to all routes in this router
router.use(authenticateToken);

// Route for creating a new therapy session
router.post("/", authorizeRole("Admin", "Doctor"), createTherapySession);

// Route for getting all therapy sessions
router.get("/", authorizeRole("Admin"), getAllTherapySessions);

// Route for getting a single therapy session by ID
router.get(
  "/:sessionId",
  authorizeRole("Admin", "Doctor", "Patient"),
  getTherapySessionById
);

// Route for updating a therapy session by ID
router.put(
  "/:sessionId",
  authorizeRole("Admin", "Doctor"),
  updateTherapySession
);

// Route for getting therapy sessions by therapist ID
router.get(
  "/therapist/:therapistId",
  authorizeRole("Admin", "Doctor"),
  getTherapySessionsByTherapistId
);

// Route for getting therapy sessions by patient ID
router.get(
  "/patient/:patientId",
  authorizeRole("Admin", "Patient", "Doctor"),
  getTherapySessionsByPatientId
);

// Route for deleting a therapy session by ID
router.delete(
  "/:sessionId",
  authorizeRole("Admin", "Doctor"),
  deleteTherapySession
);

module.exports = router;
