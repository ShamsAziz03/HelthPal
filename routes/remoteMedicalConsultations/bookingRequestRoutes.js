const express = require("express");
const router = express.Router();
const bookingReq = require("../../controllers/remoteMedicalConsultations/bookingReqController");

router.post("/addBookRequestConsultation",bookingReq.requestBookingForConsultation);

module.exports = router;

