const express = require("express");
const router = express.Router();
const bookingReqController = require("../../controllers/remoteMedicalConsultations/bookingReqController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

router.post(
  "/addBookRequestConsultation",
  authenticateToken,
  authorizeRole("Patient", "NGO"),
  bookingReqController.requestBookingForConsultation
);
router.get(
  "/getBookReqInfo",
  authenticateToken,
  authorizeRole("Admin", "Patient", "Doctor"),
  bookingReqController.getBookReqInfo
);
router.delete(
  "/deleteBookReq/:bookReqId",
  authenticateToken,
  authorizeRole("Patient", "Doctor"),
  bookingReqController.deleteBookReq
);
router.get(
  "/getDoctorBooks/:doctorId",
  authenticateToken,
  authorizeRole("Admin", "Patient", "Doctor"),
  bookingReqController.getDoctorBooks
);
router.put(
  "/changeBookReqStatus",
  authenticateToken,
  authorizeRole("Doctor"),
  bookingReqController.acceptRejectBookRequest
);

module.exports = router;
