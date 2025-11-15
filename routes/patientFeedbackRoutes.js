const express = require("express");
const router = express.Router();
const {
  createPatientFeedback,
  getFeedbacksBySponsorshipId,
} = require("../controllers/patientFeedbackController");

// Route for creating a new patient feedback
router.post("/", createPatientFeedback);

// Route for getting patient feedback by sponsorship ID
router.get("/sponsorship/:sponsorshipId", getFeedbacksBySponsorshipId);

module.exports = router;
