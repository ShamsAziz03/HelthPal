const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");

// Equipment Routes
router.post("/create", equipmentController.createEquipment);
router.get("/getAll", equipmentController.getAllEquipment);
router.get("/search", equipmentController.searchEquipment);
router.get("/getEquipment/:equipmentId", equipmentController.getEquipmentById);
router.get(
  "/getEquipmentByNGOId/:ngoId",
  equipmentController.getEquipmentByNGOId
);
router.get(
  "/getEquipmentByNGOName/:orgName",
  equipmentController.getEquipmentByNGOName
);
router.get(
  "/getEquipmentByNGOAndStatus",
  equipmentController.getEquipmentByNGOandStatus
);
router.get("/getStatistics", equipmentController.getEquipmentStatistics);
router.get("/getExpiringEquipment", equipmentController.getExpiringEquipment);
router.get(
  "/getAvailableEquipments",
  equipmentController.getAvailableCountByType
);

router.put(
  "/updateEquipmentStatusQnt/:equipmentId",
  equipmentController.updateEquipmentStatusQnt
);
router.put(
  "/updateEquipment/:equipmentId",
  equipmentController.updateEquipment
);

router.delete(
  "/deleteEquipment/:equipmentId",
  equipmentController.deleteEquipment
);

module.exports = router;
