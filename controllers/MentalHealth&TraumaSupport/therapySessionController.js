const TherapySession = require("../../models/MentalHealth&TraumaSupport/therapySessionModel");

// Create a new therapy session
exports.createTherapySession = async (req, res) => {
  try {
    const sessionData = req.body;

    const { patientId, therapistId, sessionTime } = sessionData;
    if (!patientId || !therapistId || !sessionTime) {
      return res.status(400).json({
        success: false,
        message: "patientId, therapistId and sessionTime are required",
      });
    }

    const newSession = await TherapySession.create(sessionData);
    res.status(201).json({
      success: true,
      message: "Therapy session created successfully",
      data: newSession,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating therapy session",
      error: error.message,
    });
  }
};

// Get all therapy sessions
exports.getAllTherapySessions = async (req, res) => {
  try {
    const sessions = await TherapySession.findAll();

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching therapy sessions",
      error: error.message,
    });
  }
};

// Get therapy session by ID
exports.getTherapySessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await TherapySession.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Therapy session not found",
      });
    }
    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching therapy session",
      error: error.message,
    });
  }
};

// Update therapy session
exports.updateTherapySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { notes } = req.body;
    const updatedSession = await TherapySession.updateNotes(sessionId, notes);
    if (!updatedSession) {
      return res.status(404).json({
        success: false,
        message: "Therapy session not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Therapy session updated successfully",
      data: updatedSession,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating therapy session",
      error: error.message,
    });
  }
};

// Get therapy sessions by therapist ID
exports.getTherapySessionsByTherapistId = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const sessions = await TherapySession.findByTherapistId(therapistId);
    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching therapy sessions by therapist ID",
      error: error.message,
    });
  }
};

// Get therapy sessions by patient ID
exports.getTherapySessionsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const sessions = await TherapySession.findByPatientId(patientId);
    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching therapy sessions by patient ID",
      error: error.message,
    });
  }
};

// Delete therapy session
exports.deleteTherapySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const deleted = await TherapySession.delete(sessionId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Therapy session not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Therapy session deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting therapy session",
      error: error.message,
    });
  }
};
