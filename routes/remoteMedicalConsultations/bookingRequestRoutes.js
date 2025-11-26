const express = require("express");
const router = express.Router();
const bookingReqController = require("../../controllers/remoteMedicalConsultations/bookingReqController");

router.post("/addBookRequestConsultation",bookingReqController.requestBookingForConsultation);
router.get("/getBookReqInfo",bookingReqController.getBookReqInfo);

module.exports = router;

