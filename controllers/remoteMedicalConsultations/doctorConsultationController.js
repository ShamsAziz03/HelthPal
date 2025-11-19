const doctorModel = require("../../models/doctorModel");

//to get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.getAllDrs();

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
      error: error.message,
    });
  }
};

exports.searchDoctorByNameId = async (req, res) => {
  try {
    const filters = req.query;
    const doctor = await doctorModel.searchDrsByNameId(filters);

    res.status(200).json({
      success: true,
      count: doctor.length,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching doctor",
      error: error.message,
    });
  }
};

exports.searchDoctorByStatusSepcialityNameDate = async (req, res) => {
  try {
    const filters = req.query;
    const doctor = await doctorModel.searchDrsByStatusSepcialityNameDate(filters);

    res.status(200).json({
      success: true,
      count: doctor.length,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching doctor",
      error: error.message,
    });
  }
};
