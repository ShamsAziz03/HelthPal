const express = require('express');
const router = express.Router();
const alertController = require('../controllers/publicHealthAlert.controller');

router.post('/', alertController.createAlert);

router.get('/', alertController.getAllAlerts);
router.get('/active', alertController.getActiveAlerts);
router.get('/recent', alertController.getRecentAlerts);
router.get('/stats', alertController.getAlertStatistics);


module.exports = router;
