const express = require("express");
const router = express.Router();
const { SharedRecord } = require("../controllers/sharedRecordController");

// Route to create a new shared record
router.post("/shared-records", SharedRecord);

module.exports = router;
