const express = require("express");
const router = express.Router();
const {
  SharedRecord,
  getAllSharedRecords,
  getSharedRecordsByReceiverId,
  deleteSharedRecord,
} = require("../controllers/sharedRecordController");

// Route to get all shared records
router.get("/shared-records", getAllSharedRecords);

// Route to get shared records by receiver ID
router.get(
  "/shared-records/receiver/:receiverId",
  getSharedRecordsByReceiverId
);

// Route to create a new shared record
router.post("/shared-records", SharedRecord);

// Route to delete a shared record by share ID
router.delete("/shared-records/:shareId", deleteSharedRecord);

module.exports = router;
