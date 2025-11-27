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


exports.updateStatus = async (req, res) => {
  try {
    const {consultationId,status} = req.body;
    const result = await ConsultatioModel.updateConsultationStatus(consultationId,status);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't update consultation",
      error: err.message,
    });
  }
};

exports.addNotes=async (req,res)=>{
    try{
        const {consultationId,notes}=req.body;
        const result=await ConsultatioModel.addNotes(consultationId,notes);
        res.status(200).json({
            success:true,
            data:result,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            error:err.message,
        })
    }
};

exports.addPrescription=async (req,res)=>{
    try{
        const {consultationId,prescription}=req.body;
        const result=await ConsultatioModel.addPrescription(consultationId,prescription);
        res.status(200).json({
            success:true,
            data:result,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            error:err.message,
        })
    }
};

exports.getConsultationInfo=async (req,res)=>{
    try{
        const consultationId=req.params.consultationId;
        const result=await ConsultatioModel.getConsultationDetails(consultationId);
        res.status(200).json({
            success:true,
            data:result,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            error:err.message,
        })
    }
};

exports.getPatientConsultations=async (req,res)=>{
    try{
        const patientId=req.params.patientId;
        const result=await ConsultatioModel.getPatientConsultations(patientId);
        res.status(200).json({
            success:true,
            data:result,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            error:err.message,
        })
    }
};

