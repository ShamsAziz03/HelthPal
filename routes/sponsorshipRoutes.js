const express = require("express");
const router = express.Router();
const {
  createSponsorship,
  getAllSponsorships,
  getSponsorshipById,
  getSponsorshipsByPatientId,
  getSponsorshipsByDonorId,
  updateSponsorship,
  updateSponsorshipProgress,
  checkSponsorshipGoal,
  deleteSponsorship,
} = require("../controllers/sponsorshipController");

// Route for getting all sponsorships
router.get("/", getAllSponsorships);

// Route for getting a single sponsorship by ID
router.get("/:sponsorshipId", getSponsorshipById);

// Route for getting sponsorships by patient ID
router.get("/patient/:patientId", getSponsorshipsByPatientId);

// Route for creating a new sponsorship
router.post("/", createSponsorship);

// Route for updating a sponsorship
router.put("/:sponsorshipId", updateSponsorship);

// Route for updating sponsorship progress
router.put("/:sponsorshipId/progress", updateSponsorshipProgress);

// Route for checking sponsorship goal
router.get("/:sponsorshipId/goal", checkSponsorshipGoal);

// Route for deleting a sponsorship
router.delete("/:sponsorshipId", deleteSponsorship);

module.exports = router;
