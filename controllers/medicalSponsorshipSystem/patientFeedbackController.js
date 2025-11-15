const PatientFeedback = require("../../models/medicalSponsorshipSystem/patientFeedbackModel");
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
