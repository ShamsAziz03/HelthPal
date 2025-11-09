const EquipmentModel = require("../models/equipmentModel");

exports.createEquipment = async (req, res) => {
  try {
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

exports.getEquipmentByNGO = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const equipment = await EquipmentModel.findByNGO(ngoId);

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

// Get equipment by NGO and status
exports.getEquipmentByNGO = async (req, res) => {
  try {
    const { ngoId, status } = req.params;
    const equipment = await EquipmentModel.findByNGOAndStatus(ngoId, status);

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

exports.updateEquipmentStatus = async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const { status, quantity } = req.body;

    const updated = await EquipmentModel.updateStatus(
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
