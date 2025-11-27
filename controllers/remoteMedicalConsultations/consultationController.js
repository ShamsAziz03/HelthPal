const ConsultatioModel = require("../../models/consultationModel");

exports.deleteCosultation = async (req, res) => {
  try {
    const consultationId = req.params.consultationId;
    const result = await ConsultatioModel.deleteConsultation(consultationId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't delete consultation",
      error: err.message,
    });
  }
};
