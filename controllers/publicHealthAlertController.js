const PublicHealthAlert = require('../models/publicHealthAlertModel');


exports.createAlert = async (req, res) => {
    try {
        const alertData = req.body;

        // Ensure alertId is provided
        if (!alertData.alertId) {
            return res.status(400).json({ message: 'alertId is required' });
        }

        const newAlert = await PublicHealthAlert.create(alertData);
        res.status(201).json({
            message: 'Public health alert created successfully',
            data: newAlert
        });
    } catch (error) {
        console.error('Error creating alert:', error);
        res.status(500).json({ message: 'Failed to create alert', error: error.message });
    }
};


exports.getAllAlerts = async (req, res) => {
    try {
        const filters = req.query;
        const alerts = await PublicHealthAlert.getAll(filters);
        res.status(200).json(alerts);
    } catch (error) {
        console.error('Error fetching alerts:', error);
        res.status(500).json({ message: 'Failed to fetch alerts', error: error.message });
    }
};