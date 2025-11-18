const express = require("express");
const router = express.Router();
const {
  sendTherapistMsg,
} = require("../../controllers/MentalHealth&TraumaSupport/therapyChattingController");

router.post("/sendTherapistMsg", sendTherapistMsg);

module.exports = router;
