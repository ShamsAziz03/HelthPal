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
} = require("../../controllers/medicalSponsorshipSystem/sponsorshipController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

// apply authentication to all routes in this router
router.use(authenticateToken);

// Route for getting all sponsorships
router.get("/", getAllSponsorships);

// Route for getting a single sponsorship by ID
router.get("/:sponsorshipId", getSponsorshipById);

// Route for getting sponsorships by patient ID
router.get("/patient/:patientId", getSponsorshipsByPatientId);

// Route for creating a new sponsorship
router.post("/", authorizeRole("Admin"), createSponsorship);

// Route for updating a sponsorship
router.put("/:sponsorshipId", authorizeRole("Admin"), updateSponsorship);

// Route for updating sponsorship progress
router.put(
  "/:sponsorshipId/progress",
  authorizeRole("Admin"),
  updateSponsorshipProgress
);

// Route for checking sponsorship goal
router.get(
  "/:sponsorshipId/goal",
  authorizeRole("Admin", "Donor"),
  checkSponsorshipGoal
);

// Route for deleting a sponsorship
router.delete("/:sponsorshipId", authorizeRole("Admin"), deleteSponsorship);

module.exports = router;
