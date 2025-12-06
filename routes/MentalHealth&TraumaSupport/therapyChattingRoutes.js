const express = require("express");
const router = express.Router();
const {
  sendTherapistMsg,
  getTherapistMsgs,
} = require("../../controllers/MentalHealth&TraumaSupport/therapyChattingController");
const {
  authenticateToken,
  authorizeRole,
} = require("../../middleware/authMiddleware");

// apply authentication to all routes in this router
router.use(authenticateToken);

router.post(
  "/sendTherapistMsg",
  authorizeRole("Admin", "Doctor", "Patient"),
  sendTherapistMsg
);
router.get(
  "/getTherapistMsgs",
  authorizeRole("Admin", "Doctor", "Patient"),
  getTherapistMsgs
);
module.exports = router;
