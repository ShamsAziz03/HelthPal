const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

// Equipment Routes
router.post(
  "/create",
  authenticateToken,
  authorizeRole("Admin", "NGO"),
  equipmentController.createEquipment
);
router.get(
  "/getAll",
  authenticateToken,
  authorizeRole("Admin", "Doctor", "NGO"),
  equipmentController.getAllEquipment
);
router.get(
  "/search",
  authenticateToken,
  authorizeRole("Admin", "Doctor", "NGO"),
  equipmentController.searchEquipment
);
router.get(
  "/getEquipment/:equipmentId",
  authenticateToken,
  authorizeRole("Admin", "NGO"),
  equipmentController.getEquipmentById
);
router.get(
  "/getEquipmentByNGOId/:ngoId",
  authenticateToken,
  authorizeRole("Admin"),
  equipmentController.getEquipmentByNGOId
);
router.get(
  "/getEquipmentByNGOName/:orgName",
  authenticateToken,
  authorizeRole("Admin"),
  equipmentController.getEquipmentByNGOName
);
router.get(
  "/getEquipmentByNGOAndStatus",
  authenticateToken,
  authorizeRole("Admin", "NGO"),
  equipmentController.getEquipmentByNGOandStatus
);
router.get(
  "/getStatistics",
  authenticateToken,
  authorizeRole("Admin", "Doctor"),
  equipmentController.getEquipmentStatistics
);
router.get(
  "/getExpiringEquipment",
  authenticateToken,
  authorizeRole("Admin", "Doctor", "NGO"),
  equipmentController.getExpiringEquipment
);
router.get(
  "/getAvailableEquipments",
  authenticateToken,
  authorizeRole("Admin", "Doctor", "NGO"),
  equipmentController.getAvailableCountByType
);

router.put(
  "/updateEquipmentStatusQnt/:equipmentId",
  authenticateToken,
  authorizeRole("Admin"),
  equipmentController.updateEquipmentStatusQnt
);
router.put(
  "/updateEquipment/:equipmentId",
  authenticateToken,
  authorizeRole("Admin"),
  equipmentController.updateEquipment
);

router.delete(
  "/deleteEquipment/:equipmentId",
  authenticateToken,
  authorizeRole("Admin"),
  equipmentController.deleteEquipment
);

module.exports = router;
