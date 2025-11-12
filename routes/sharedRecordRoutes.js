const express = require("express");
const router = express.Router();
const {
  SharedRecord,
  getAllSharedRecords,
} = require("../controllers/sharedRecordController");

// Route to get all shared records
router.get("/shared-records", getAllSharedRecords);

// Route to create a new shared record
router.post("/shared-records", SharedRecord);

module.exports = router;
