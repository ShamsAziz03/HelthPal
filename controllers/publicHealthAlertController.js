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


exports.getActiveAlerts = async (req, res) => {
    try {
        const filters = req.query;
        const activeAlerts = await PublicHealthAlert.getActive(filters);
        res.status(200).json(activeAlerts);
    } catch (error) {
        console.error('Error fetching active alerts:', error);
        res.status(500).json({ message: 'Failed to fetch active alerts', error: error.message });
    }
};
exports.getAlertById = async (req, res) => {
    try {
        const { alertId } = req.params;
        const alert = await PublicHealthAlert.getById(alertId);

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        res.status(200).json(alert);
    } catch (error) {
        console.error('Error fetching alert by ID:', error);
        res.status(500).json({ message: 'Failed to fetch alert', error: error.message });
    }
};


exports.updateAlert = async (req, res) => {
    try {
        const { alertId } = req.params;
        const updates = req.body;

        const updatedAlert = await PublicHealthAlert.update(alertId, updates);
        if (!updatedAlert) {
            return res.status(404).json({ message: 'Alert not found or no changes applied' });
        }

        res.status(200).json({
            message: 'Alert updated successfully',
            data: updatedAlert
        });
    } catch (error) {
        console.error('Error updating alert:', error);
        res.status(500).json({ message: 'Failed to update alert', error: error.message });
    }
};
exports.expireAlert = async (req, res) => {
    try {
        const { alertId } = req.params;
        const result = await PublicHealthAlert.expire(alertId);

        if (!result) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        res.status(200).json({ message: 'Alert expired successfully' });
    } catch (error) {
        console.error('Error expiring alert:', error);
        res.status(500).json({ message: 'Failed to expire alert', error: error.message });
    }
};

exports.deleteAlert = async (req, res) => {
    try {
        const { alertId } = req.params;
        const deleted = await PublicHealthAlert.delete(alertId);

        if (!deleted) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        res.status(200).json({ message: 'Alert deleted successfully' });
    } catch (error) {
        console.error('Error deleting alert:', error);
        res.status(500).json({ message: 'Failed to delete alert', error: error.message });
    }
};

exports.getAlertsBySeverity = async (req, res) => {
    try {
        const { severity } = req.params;
        const alerts = await PublicHealthAlert.getBySeverity(severity);
        res.status(200).json(alerts);
    } catch (error) {
        console.error('Error fetching alerts by severity:', error);
        res.status(500).json({ message: 'Failed to fetch alerts', error: error.message });
    }
};

exports.getAlertsByArea = async (req, res) => {
    try {
        const { area } = req.params;
        const alerts = await PublicHealthAlert.getByArea(area);
        res.status(200).json(alerts);
    } catch (error) {
        console.error('Error fetching alerts by area:', error);
        res.status(500).json({ message: 'Failed to fetch alerts', error: error.message });
    }
};