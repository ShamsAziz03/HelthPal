const express = require("express");
const router = express.Router();

const HealthEducationController = require("../controllers/healthEducation.controller");

router.post("/", HealthEducationController.create);
router.get("/", HealthEducationController.getAll);
router.get("/:id", HealthEducationController.getById);
router.get("/category/:category", HealthEducationController.getByCategory);
router.put("/:id", HealthEducationController.update);



module.exports = router;
