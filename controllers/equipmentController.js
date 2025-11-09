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
