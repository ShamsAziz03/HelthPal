const PatientUpdate = require("../../models/MedicalSponsorshipSystem/patientUpdateModel");

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

// Get all patient updates
exports.getAllPatientUpdates = async (req, res) => {
  try {
    const updates = await PatientUpdate.findAll();
    res.status(200).json({
      success: true,
      count: updates.length,
      data: updates,
    });
  } catch (error) {
    console.error("Error fetching patient updates:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching patient updates",
      error: error.message,
    });
  }
};

// Get patient update by ID
exports.getPatientUpdateById = async (req, res) => {
  try {
    const { updateId } = req.params;
    const update = await PatientUpdate.findById(updateId);
    if (!update) {
      return res.status(404).json({ message: "Patient update not found" });
    }
    res.status(200).json({ success: true, data: update });
  } catch (error) {
    console.error("Error fetching patient update by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching patient update by ID",
      error: error.message,
    });
  }
};

// Get updates by sponsorship ID
exports.getUpdatesBySponsorshipId = async (req, res) => {
  try {
    const { sponsorshipId } = req.params;
    const updates = await PatientUpdate.getBySponsorship(sponsorshipId);
    res.status(200).json({
      success: true,
      count: updates.length,
      data: updates,
    });
  } catch (error) {
    console.error("Error fetching updates by sponsorship ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching updates by sponsorship ID",
      error: error.message,
    });
  }
};

// Get updates by patient ID
exports.getUpdatesByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const updates = await PatientUpdate.getByPatient(patientId);
    res.status(200).json({
      success: true,
      count: updates.length,
      data: updates,
    });
  } catch (error) {
    console.error("Error fetching updates by patient ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching updates by patient ID",
      error: error.message,
    });
  }
};

// Update a patient update
exports.updatePatientUpdate = async (req, res) => {
  try {
    const { updateId } = req.params;
    const updateData = req.body;
    const updatedUpdate = await PatientUpdate.update(updateId, updateData);
    res.status(200).json({
      success: true,
      message: "Patient update updated successfully",
      data: updatedUpdate,
    });
  } catch (error) {
    console.error("Error updating patient update:", error);
    res.status(500).json({
      success: false,
      message: "Error updating patient update",
      error: error.message,
    });
  }
};

// Delete a patient update
exports.deletePatientUpdate = async (req, res) => {
  try {
    const { updateId } = req.params;
    await PatientUpdate.delete(updateId);
    res.status(200).json({
      success: true,
      message: "Patient update deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting patient update:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting patient update",
      error: error.message,
    });
  }
};
