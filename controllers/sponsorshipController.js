const Sponsorship = require("../models/sponsorshipModel");

// Get a single sponsorship by ID
exports.getSponsorshipById = async (req, res) => {
  try {
    const { sponsorshipId } = req.params;
    console.log(`Fetching sponsorship ${sponsorshipId}`);

    const sponsorship = await Sponsorship.findById(sponsorshipId);

    if (!sponsorship) {
      return res.status(404).json({
        success: false,
        message: "Sponsorship not found",
      });
    }

    res.status(200).json({
      success: true,
      data: sponsorship,
    });
  } catch (error) {
    console.error("Error fetching sponsorship:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching sponsorship",
      error: error.message,
    });
  }
};

// Get all sponsorships
exports.getAllSponsorships = async (req, res) => {
  try {
    console.log("Fetching all sponsorships...");
    const sponsorships = await Sponsorship.findAll();
    res.status(200).json({
      success: true,
      count: sponsorships.length,
      data: sponsorships,
    });
  } catch (error) {
    console.error("Error fetching sponsorships:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching sponsorships",
      error: error.message,
    });
  }
};

// Get sponsorships by patient ID
exports.getSponsorshipsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    console.log(`Fetching sponsorships for patient ${patientId}`);
    const sponsorships = await Sponsorship.findByPatientId(patientId);
    res.status(200).json({
      success: true,
      count: sponsorships.length,
      data: sponsorships,
    });
  } catch (error) {
    console.error("Error fetching sponsorships by patient ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching sponsorships by patient ID",
      error: error.message,
    });
  }
};

// Get sponsorships by donor ID
exports.getSponsorshipsByDonorId = async (req, res) => {
  try {
    const { donorId } = req.params;
    console.log(`Fetching sponsorships for donor ${donorId}`);
    const sponsorships = await Sponsorship.findByDonorId(donorId);
    res.status(200).json({
      success: true,
      count: sponsorships.length,
      data: sponsorships,
    });
  } catch (error) {
    console.error("Error fetching sponsorships by donor ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching sponsorships by donor ID",
      error: error.message,
    });
  }
};

// Create a new sponsorship
exports.createSponsorship = async (req, res) => {
  try {
    console.log("Creating sponsorship with data:", req.body);
    const sponsorshipData = req.body;

    if (!sponsorshipData.patientId || !sponsorshipData.donorId) {
      return res.status(400).json({
        success: false,
        message: "patientId and donorId are required",
      });
    }

    const result = await Sponsorship.create(sponsorshipData);
    res.status(201).json({
      success: true,
      message: "Sponsorship created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating sponsorship:", error);
    res.status(500).json({
      success: false,
      message: "Error creating sponsorship",
      error: error.message,
    });
  }
};

// Update a sponsorship
exports.updateSponsorship = async (req, res) => {
  try {
    const { sponsorshipId } = req.params;
    const updateData = req.body;

    console.log(`Updating sponsorship ${sponsorshipId}:`, updateData);

    const result = await Sponsorship.update(sponsorshipId, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Sponsorship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sponsorship updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating sponsorship:", error);
    res.status(500).json({
      success: false,
      message: "Error updating sponsorship",
      error: error.message,
    });
  }
};

exports.updateSponsorshipProgress = async (req, res) => {
  try {
    const { sponsorshipId } = req.params;
    const { amount } = req.body;
    console.log(
      `Updating sponsorship ${sponsorshipId} progress by amount:`,
      amount
    );

    const result = await Sponsorship.updateProgress(sponsorshipId, amount);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Sponsorship not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Sponsorship progress updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating sponsorship progress:", error);
    res.status(500).json({
      success: false,
      message: "Error updating sponsorship progress",
      error: error.message,
    });
  }
};

// Delete a sponsorship
exports.deleteSponsorship = async (req, res) => {
  try {
    const { sponsorshipId } = req.params;

    console.log(`Deleting sponsorship ${sponsorshipId}`);

    const result = await Sponsorship.delete(sponsorshipId);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Sponsorship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sponsorship deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting sponsorship:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting sponsorship",
      error: error.message,
    });
  }
};
