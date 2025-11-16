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
