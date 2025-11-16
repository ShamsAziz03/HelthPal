const express = require("express");
const router = express.Router();
const {
    createTherapySession,   
} = require("../../controllers/MentalHealth&TraumaSupport/therapySessionController");

// Route for creating a new therapy session
router.post("/", createTherapySession);

module.exports = router;