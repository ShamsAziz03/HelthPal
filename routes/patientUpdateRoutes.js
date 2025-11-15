const express = require("express");
const router = express.Router();
const {
  createPatientUpdate,
} = require("../controllers/patientUpdateController");

// Route for creating a new patient update
router.post("/", createPatientUpdate);

module.exports = router;
