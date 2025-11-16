const express = require("express");
const router = express.Router();
const {
  createPatientUpdate,
  getAllPatientUpdates,
  getPatientUpdateById,
  getUpdatesByPatientId,
  getUpdatesBySponsorshipId,
} = require("../../controllers/medicalSponsorshipSystem/patientUpdateController");

// Route for getting all patient updates
router.get("/", getAllPatientUpdates);

// Route for getting a single patient update by ID
router.get("/:updateId", getPatientUpdateById);

// Route for getting updates by patient ID
router.get("/patient/:patientId", getUpdatesByPatientId);

// Route for getting updates by sponsorship ID
router.get("/sponsorship/:sponsorshipId", getUpdatesBySponsorshipId);

// Route for creating a new patient update
router.post("/", createPatientUpdate);

module.exports = router;
