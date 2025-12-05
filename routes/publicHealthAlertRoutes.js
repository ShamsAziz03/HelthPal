const express = require('express');
const router = express.Router();
const alertController = require('../controllers/publicHealthAlertController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');


router.post('/', authenticateToken, authorizeRole('Admin'), alertController.createAlert);


router.get('/', alertController.getAllAlerts);
router.get('/active', alertController.getActiveAlerts);
router.get('/recent', alertController.getRecentAlerts);
router.get('/status', alertController.getAlertStatistics);
router.get('/severity/:severity', alertController.getAlertsBySeverity);
router.get('/area/:area', alertController.getAlertsByArea);
router.get('/:alertId', alertController.getAlertById);


router.put('/:alertId', authenticateToken, authorizeRole('Admin'), alertController.updateAlert);


router.patch('/:alertId/expire', authenticateToken, authorizeRole('Admin'), alertController.expireAlert);


router.delete('/:alertId', authenticateToken, authorizeRole('Admin'), alertController.deleteAlert);

module.exports = router;
