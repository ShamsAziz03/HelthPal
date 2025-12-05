const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const HealthEducationController = require("../controllers/healthEducationController.js");


router.post("/", authenticateToken, authorizeRole('Admin'), HealthEducationController.create);


router.get("/", HealthEducationController.getAll);
router.get("/:id", HealthEducationController.getById);
router.get("/category/:category", HealthEducationController.getByCategory);
router.get("/meta/categories/list", HealthEducationController.getCategories);


router.put("/:id", authenticateToken, authorizeRole('Admin'), HealthEducationController.update);


router.delete("/:id", authenticateToken, authorizeRole('Admin'), HealthEducationController.delete);


router.get("/meta/statistics", authenticateToken, authorizeRole('Admin'), HealthEducationController.getStatistics);



module.exports = router;
