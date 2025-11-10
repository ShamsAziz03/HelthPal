const express = require('express')
const router = express.Router()
const availabilityController = require('../controllers/drAvailabilityController')

router.post('/add', availabilityController.add)

module.exports = router