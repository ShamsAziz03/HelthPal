const BookingReqMode = require("../../models/bookingModel");

exports.requestBookingForConsultation = async (req, res) => {
  try {
    const data=req.body;
    const result = await BookingReqMode.addBookReqForConsultation(data);
    res.status(200).json({
      success: true,
      message:"Book request Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding book request for consultation",
      error: error.message,
    });
  }
};
