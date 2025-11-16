const PatientFeedback = require("../../models/MedicalSponsorshipSystem/patientFeedbackModel");
const db = require("../../config/db");

// Create a new patient feedback
exports.createPatientFeedback = async (req, res) => {
  try {
    console.log("Creating patient feedback with data:", req.body);
    const feedbackData = req.body;
    if (
      !feedbackData.sponsorshipId ||
      !feedbackData.patientId ||
      feedbackData.rating === undefined ||
      feedbackData.message === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "sponsorshipId, patientId, rating, and message are required",
      });
    }
    // Verify patient exists and has given consent
    const [patientRows] = await db.execute(
      "SELECT * FROM patient WHERE patientId = ?",
      [feedbackData.patientId]
    );
    if (!patientRows || patientRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Patient not found",
      });
    }
    const patient = patientRows[0];
    // If the patient hasn't given consent, forbid creating feedback
    if (!patient.consentGiven) {
      return res.status(403).json({
        success: false,
        message:
          "Patient has not given consent for data sharing. Cannot create feedback.",
      });
    }
    const newFeedback = await PatientFeedback.create(feedbackData);

    res.status(201).json({
      success: true,
      message: "Patient feedback created successfully",
      data: newFeedback,
    });
  } catch (error) {
    console.error("Error creating patient feedback:", error);
    res.status(500).json({
      success: false,
      message: "Error creating patient feedback",
      error: error.message,
    });
  }
};

// Get feedbacks by sponsorship ID
exports.getFeedbacksBySponsorshipId = async (req, res) => {
  try {
    const { sponsorshipId } = req.params;
    console.log(`Fetching feedbacks for sponsorship ${sponsorshipId}`);
    const feedbacks = await PatientFeedback.getFeedbacksBySponsorshipId(
      sponsorshipId
    );
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks by sponsorship ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching feedbacks by sponsorship ID",
      error: error.message,
    });
  }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await PatientFeedback.getAllFeedbacks();
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching all feedbacks:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching all feedbacks",
      error: error.message,
    });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await PatientFeedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    console.error("Error fetching feedback by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching feedback by ID",
      error: error.message,
    });
  }
};

// Delete feedback by ID
exports.deleteFeedbackById = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const deleted = await PatientFeedback.delete(feedbackId);
    if (!deleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting feedback by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting feedback by ID",
      error: error.message,
    });
  }
};
