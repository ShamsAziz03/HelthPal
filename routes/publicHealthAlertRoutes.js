const express = require('express');
const router = express.Router();
const alertController = require('../controllers/publicHealthAlertController');

router.post('/', alertController.createAlert);

router.get('/', alertController.getAllAlerts);
router.get('/active', alertController.getActiveAlerts);
router.get('/recent', alertController.getRecentAlerts);
router.get('/status', alertController.getAlertStatistics);
router.get('/severity/:severity', alertController.getAlertsBySeverity);
router.get('/area/:area', alertController.getAlertsByArea);
router.get('/:alertId', alertController.getAlertById);

router.put('/:alertId', alertController.updateAlert);

router.patch('/:alertId/expire', alertController.expireAlert);
router.delete('/:alertId', alertController.deleteAlert);

module.exports = router;
