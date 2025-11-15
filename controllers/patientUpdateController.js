const PatientUpdate = require("../models/patientUpdateModel");

// Create a new patient update
exports.createPatientUpdate = async (req, res) => {
  try {
    console.log("Creating patient update with data:", req.body);
    const updateData = req.body;
    if (
      !updateData.sponsorshipId ||
      !updateData.patientId ||
      !updateData.updateText
    ) {
      return res.status(400).json({
        success: false,
        message: "sponsorshipId, patientId, and updateText are required",
      });
    }
    const newUpdate = await PatientUpdate.create(updateData);

    res.status(201).json({
      success: true,
      message: "Patient update created successfully",
      data: newUpdate,
    });
  } catch (error) {
    console.error("Error creating patient update:", error);
    res.status(500).json({
      success: false,
      message: "Error creating patient update",
      error: error.message,
    });
  }
};
