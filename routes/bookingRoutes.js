const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')

router.post('/add', bookingController.add)

module.exports = router
