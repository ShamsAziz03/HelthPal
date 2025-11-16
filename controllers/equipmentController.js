const EquipmentModel = require("../models/equipmentModel");

exports.createEquipment = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const equipmentData = req.body;
    const newEquipment = await EquipmentModel.create(equipmentData);

    res.status(201).json({
      success: true,
      message: "Equipment added successfully",
      data: newEquipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding equipment",
      error: error.message,
    });
  }
};

exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await EquipmentModel.findAll();

    res.status(200).json({
      success: true,
      count: equipment.length,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching equipment",
      error: error.message,
    });
  }
};

exports.getEquipmentById = async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const equipment = await EquipmentModel.findById(equipmentId);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching equipment",
      error: error.message,
    });
  }
};

exports.searchEquipment = async (req, res) => {
  try {
    const filters = req.query;
    const equipment = await EquipmentModel.search(filters);

    res.status(200).json({
      success: true,
      count: equipment.length,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching equipment",
      error: error.message,
    });
  }
};

exports.getEquipmentByNGOId = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const equipment = await EquipmentModel.findByNGOId(ngoId);

    res.status(200).json({
      success: true,
      count: equipment.length,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching NGO equipment",
      error: error.message,
    });
  }
};

exports.getEquipmentByNGOName = async (req, res) => {
  try {
    const { orgName } = req.params;
    const equipment = await EquipmentModel.findByNGOName(orgName);

    res.status(200).json({
      success: true,
      count: equipment.length,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching NGO equipment",
      error: error.message,
    });
  }
};

exports.getEquipmentByNGOandStatus = async (req, res) => {
  try {
    const filters = req.query;
    const equipment = await EquipmentModel.findByNGOAndStatus(filters);

    res.status(200).json({
      success: true,
      count: equipment.length,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching NGO equipment",
      error: error.message,
    });
  }
};

exports.updateEquipmentStatusQnt = async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const { status, quantity } = req.body;

    const updated = await EquipmentModel.updateStatusQnt(
      equipmentId,
      status,
      quantity
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Equipment updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating equipment",
      error: error.message,
    });
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const updateData = req.body;

    const updated = await EquipmentModel.update(equipmentId, updateData);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Equipment updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating equipment",
      error: error.message,
    });
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const deleted = await EquipmentModel.delete(equipmentId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Equipment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting equipment",
      error: error.message,
    });
  }
};

exports.getEquipmentStatistics = async (req, res) => {
  try {
    const stats = await EquipmentModel.getStatistics();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching equipment statistics",
      error: error.message,
    });
  }
};

exports.getExpiringEquipment = async (req, res) => {
  try {
    const days = req.query.days || 30;
    const equipment = await EquipmentModel.getExpiringEquipment(days);

    res.status(200).json({
      success: true,
      count: equipment.length,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching expiring equipment",
      error: error.message,
    });
  }
};

exports.getAvailableCountByType = async (req, res) => {
  try {
    const equipment = await EquipmentModel.getAvailableCountByType();

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "no Available Equipment found",
      });
    }

    res.status(200).json({
      success: true,
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching available equipment",
      error: error.message,
    });
  }
};
