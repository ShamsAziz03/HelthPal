const doctorModel = require("../../models/doctorModel");
const doctorAvailabilityModel = require("../../models/drAvailabilityModel");

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
    const doctor = await doctorModel.searchDrsByStatusSepcialityNameDate(
      filters
    );

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

exports.getDoctorSchedule = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctorSchedule = await doctorModel.getDrSchedule(doctorId);
    res.status(200).json({
      data: doctorSchedule,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching availability", error: error.message });
  }
};

exports.getDoctorsAvailable = async (req, res) => {
  try {
    const result = await doctorAvailabilityModel.getAvailableDoctors();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
      error: err.message,
    });
  }
};
