const express = require("express");
const router = express.Router();
const {
  createSponsorship,
  getAllSponsorships,
  getSponsorshipById,
} = require("../controllers/sponsorshipController");

// Route for getting all sponsorships
router.get("/", getAllSponsorships);

// Route for getting a single sponsorship by ID
router.get("/:sponsorshipId", getSponsorshipById);

// Route for creating a new sponsorship
router.post("/", createSponsorship);

module.exports = router;
