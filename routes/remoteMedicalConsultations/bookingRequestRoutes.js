const express = require("express");
const router = express.Router();
const bookingReqController = require("../../controllers/remoteMedicalConsultations/bookingReqController");

router.post("/addBookRequestConsultation",bookingReqController.requestBookingForConsultation);
router.get("/getBookReqInfo",bookingReqController.getBookReqInfo);
router.delete("/deleteBookReq/:bookReqId",bookingReqController.deleteBookReq);
router.get("/getDoctorBooks/:doctorId",bookingReqController.getDoctorBooks);
router.put("/changeBookReqStatus",bookingReqController.acceptRejectBookRequest);

module.exports = router;

