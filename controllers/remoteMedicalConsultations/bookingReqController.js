const BookingReqModel = require("../../models/bookingModel");

exports.requestBookingForConsultation = async (req, res) => {
  try {
    const data = req.body;
    const result = await BookingReqModel.addBookReqForConsultation(data);
    res.status(200).json({
      success: true,
      message: "Book request Added Successfully",
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
    try{
        const filter=req.query;
        const result=await BookingReqModel.getBookReqInfo(filter);
        res.status(200).json({
            success:true,
            data:result,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"can't get book req info!",
            error:err.message,
        })
    }
};


exports.deleteBookReq = async (req, res) => {
    try{
        const bookReqId=req.params.bookReqId;
        await BookingReqModel.delete(bookReqId);
        res.status(200).json({
            success:true,
            message:"Delete book request done",
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"can't get book req info!",
            error:err.message,
        })
    }
};


exports.getDoctorBooks = async (req, res) => {
    try{
        const doctorId=req.params.doctorId;
        const result=await BookingReqModel.getDoctorBooks(doctorId);
        res.status(200).json({
            success:true,
            data:result,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"can't get book req info!",
            error:err.message,
        })
    }
};
