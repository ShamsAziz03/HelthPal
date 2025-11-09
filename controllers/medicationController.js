const MedicationRequestModel = require('../models/medicationRequestModel');

exports.createMedicationRequest = async (req, res) => {
    try {
        const requestData = req.body;
        const newRequest = await MedicationRequestModel.create(requestData);

        res.status(201).json({
            success: true,
            message: 'Medication request created successfully',
            data: newRequest
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating medication request',
            error: error.message
        });
    }
};

