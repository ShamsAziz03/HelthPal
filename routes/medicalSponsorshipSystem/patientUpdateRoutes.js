const express = require("express");
const router = express.Router();
const {
  createPatientUpdate,
  getAllPatientUpdates,
  getPatientUpdateById,
  getUpdatesByPatientId,
  getUpdatesBySponsorshipId,
  updatePatientUpdate,
  deletePatientUpdate,
} = require("../../controllers/medicalSponsorshipSystem/patientUpdateController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

// protect all patient-update routes
router.use(authenticateToken);

// Route for getting all patient updates
router.get("/", authorizeRole("Admin", "Doctor"), getAllPatientUpdates);

// Route for getting a single patient update by ID
router.get(
  "/:updateId",
  authorizeRole("Admin", "Doctor", "Donor"),
  getPatientUpdateById
);

// Route for getting updates by patient ID
router.get(
  "/patient/:patientId",
  authorizeRole("Admin", "Doctor", "Patient"),
  getUpdatesByPatientId
);

// Route for getting updates by sponsorship ID
router.get(
  "/sponsorship/:sponsorshipId",
  authorizeRole("Admin", "Doctor", "Donor"),
  getUpdatesBySponsorshipId
);

// Route for creating a new patient update
router.post("/", authorizeRole("Admin", "Doctor"), createPatientUpdate);

// Route for updating a patient update
router.put("/:updateId", authorizeRole("Admin", "Doctor"), updatePatientUpdate);

// Route for deleting a patient update
router.delete("/:updateId", authorizeRole("Admin"), deletePatientUpdate);

module.exports = router;
