const MedicationRequestModel = require("../models/medicationRequestModel");
const EquipmentModel = require("../models/equipmentModel");

exports.createMedicationRequest = async (req, res) => {
  try {
    const requestData = req.body;
    const newRequest = await MedicationRequestModel.create(requestData);

    res.status(201).json({
      success: true,
      message: "Medication request created successfully",
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating medication request",
      error: error.message,
    });
  }
};
exports.getAllMedicationRequests = async (req, res) => {
  try {
    const requests = await MedicationRequestModel.findAll();

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching medication requests",
      error: error.message,
    });
  }
};

exports.getMedicationRequestById = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await MedicationRequestModel.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Medication request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching medication request",
      error: error.message,
    });
  }
};
exports.getMedicationRequestsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const requests = await MedicationRequestModel.findByPatientId(patientId);

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching patient medication requests",
      error: error.message,
    });
  }
};

exports.getMedicationRequestsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const requests = await MedicationRequestModel.findByStatus(status);

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching medication requests by status",
      error: error.message,
    });
  }
};

exports.getMedicationRequestsByNGO = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const requests = await MedicationRequestModel.findByNGO(ngoId);

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching NGO medication requests",
      error: error.message,
    });
  }
};
exports.getMedicationRequestsByNGOandStatus = async (req, res) => {
  try {
    const { ngoId, status } = req.params;
    const requests =
      await MedicationRequestModel.filteringNGOsMedicationRequestsStatus(
        ngoId,
        status
      );

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching NGO medication requests",
      error: error.message,
    });
  }
};

//************************************** */

exports.reduceQuantity = async (req, res) => {
  try {
    const { requestId, ngoId, equipmentId, quantity } = req.body;

    if (!requestId || !ngoId || !equipmentId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const equipment = await EquipmentModel.findById(equipmentId);
    if (!equipment) {
      return res
        .status(404)
        .json({ success: false, message: "Equipment not found" });
    }

    if (equipment.quantity < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient quantity" });
    }

    const newQuantity = equipment.quantity - quantity;
    const newStatus = newQuantity === 0 ? "Out of Service" : "Available";

    // 1️⃣ Update equipment
    const updatedEquipment = await EquipmentModel.updateStatus(
      equipmentId,
      newStatus,
      newQuantity
    );
    if (!updatedEquipment) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update equipment" });
    }

    // 2️⃣ Update medication request
    const updatedRequest = await MedicationRequestModel.updateStatus(
      requestId,
      "handled",
      ngoId
    );
    if (!updatedRequest) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update request" });
    }

    res.status(200).json({
      success: true,
      message: "Request handled successfully",
      data: { equipmentId, newQuantity, newStatus },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error handling equipment request",
      error: error.message,
    });
  }
};

///************************************** */

exports.updateMedicationRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, ngoId } = req.body;

    const updated = await MedicationRequestModel.updateStatus(
      requestId,
      status,
      ngoId
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Medication request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medication request status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating medication request",
      error: error.message,
    });
  }
};
exports.deleteMedicationRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const deleted = await MedicationRequestModel.delete(requestId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Medication request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medication request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting medication request",
      error: error.message,
    });
  }
};
//Statistics for admin dashboard
exports.getMedicationStatistics = async (req, res) => {
  try {
    const stats = await MedicationRequestModel.getStatistics();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};
