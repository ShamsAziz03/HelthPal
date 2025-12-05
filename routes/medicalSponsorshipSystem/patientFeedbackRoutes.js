const express = require("express");
const router = express.Router();
const {
  createPatientFeedback,
  getFeedbacksBySponsorshipId,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedbackById,
} = require("../../controllers/medicalSponsorshipSystem/patientFeedbackController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

// protect feedback routes
router.use(authenticateToken);

// Route for getting all patient feedbacks
router.get("/", authorizeRole("Admin"), getAllFeedbacks);

// Route for getting a single patient feedback by ID
router.get("/:feedbackId", getFeedbackById);

// Route for creating a new patient feedback
router.post("/", authorizeRole("Patient"), createPatientFeedback);

// Route for getting patient feedback by sponsorship ID
router.get("/sponsorship/:sponsorshipId", getFeedbacksBySponsorshipId);

// Route for deleting a patient feedback by ID
router.delete("/:feedbackId", authorizeRole("Admin"), deleteFeedbackById);

module.exports = router;
