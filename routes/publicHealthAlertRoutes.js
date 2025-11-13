const express = require('express');
const router = express.Router();
const alertController = require('../controllers/publicHealthAlert.controller');

router.post('/', alertController.createAlert);


module.exports = router;
