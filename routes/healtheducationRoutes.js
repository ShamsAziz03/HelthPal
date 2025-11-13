const express = require("express");
const router = express.Router();

const HealthEducationController = require("../controllers/healthEducation.controller");

router.post("/", HealthEducationController.create);



module.exports = router;
