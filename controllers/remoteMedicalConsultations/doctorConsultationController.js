const doctorModel = require("../../models/doctorModel");

//to get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctor = await doctorModel.getAllDrs();

    res.status(200).json({
      success: true,
      count: doctor.length,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
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
