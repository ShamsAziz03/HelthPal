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
exports.getAllMedicationRequests = async (req, res) => {
    try {
        const requests = await MedicationRequestModel.findAll();

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching medication requests',
            error: error.message
        });
    }
};

exports.getMedicationRequestById = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await MedicationRequestModel.findById(requestId);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Medication request not found'
            });
        }

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching medication request',
            error: error.message
        });
    }
};
exports.getMedicationRequestsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const requests = await MedicationRequestModel.findByPatientId(patientId);

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching patient medication requests',
            error: error.message
        });
    }
};

exports.getMedicationRequestsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const requests = await MedicationRequestModel.findByStatus(status);

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching medication requests by status',
            error: error.message
        });
    }
};








