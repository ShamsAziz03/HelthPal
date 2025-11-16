const express = require("express");
const router = express.Router();
const {
  SharedRecord,
  getAllSharedRecords,
  getSharedRecordsByReceiverId,
  deleteSharedRecord,
} = require("../../controllers/MedicalSponsorshipSystem/sharedRecordController");

// Route to get all shared records
router.get("/", getAllSharedRecords);

// Route to get shared records by receiver ID
router.get("/receiver/:receiverId", getSharedRecordsByReceiverId);

// Route to create a new shared record
router.post("/", SharedRecord);

// Route to delete a shared record by share ID
router.delete("/:shareId", deleteSharedRecord);

module.exports = router;
