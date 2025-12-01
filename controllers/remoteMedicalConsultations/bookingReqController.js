const BookingReqModel = require("../../models/bookingModel");
const ConsultatioModel = require("../../models/consultationModel");

exports.requestBookingForConsultation = async (req, res) => {
  try {
    const data = req.body;
    const result = await BookingReqModel.addBookReqForConsultation(data);
    res.status(200).json({
      success: true,
      message: "Book request Added Successfully",
      data:result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding book request for consultation",
      error: error.message,
    });
  }
};

exports.getBookReqInfo = async (req, res) => {
  try {
    const filter = req.query;
    const result = await BookingReqModel.getBookReqInfo(filter);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't get book req info!",
      error: err.message,
    });
  }
};

exports.deleteBookReq = async (req, res) => {
  try {
    const bookReqId = req.params.bookReqId;
    await BookingReqModel.delete(bookReqId);
    res.status(200).json({
      success: true,
      message: "Delete book request done",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't get book req info!",
      error: err.message,
    });
  }
};

exports.getDoctorBooks = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const result = await BookingReqModel.getDoctorBooks(doctorId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't get book req info!",
      error: err.message,
    });
  }
};

exports.acceptRejectBookRequest = async (req, res) => {
  try {
    const { bookReqId, newStatus } = req.body;
    const result = await BookingReqModel.updateStatus(bookReqId, newStatus);
    let data = {};
    if (newStatus === "Accepted") {
      const resultConsultation = await ConsultatioModel.addConsultation({
        consultationType: null,
        notes: null,
        prescription: null,
        bookRequestId: bookReqId,
      });
      data = resultConsultation;
    }
    res.status(200).json({
      success: true,
      updateStatus: result,
      consultation: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        "can't change state of book request or dr available time slot or add new consultation",
      error: err.message,
    });
  }
};
