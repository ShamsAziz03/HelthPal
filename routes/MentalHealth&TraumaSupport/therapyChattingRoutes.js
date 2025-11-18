const express = require("express");
const router = express.Router();
const {
  sendTherapistMsg, getTherapistMsgs
} = require("../../controllers/MentalHealth&TraumaSupport/therapyChattingController");

router.post("/sendTherapistMsg", sendTherapistMsg);
router.get("/getTherapistMsgs", getTherapistMsgs);
module.exports = router;
