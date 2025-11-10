const express = require("express");
const router = express.Router();
const {
  createSponsorship,
} = require("../controllers/sponsorshipController");

// Route for creating a new sponsorship
router.post("/", createSponsorship);

module.exports = router;
