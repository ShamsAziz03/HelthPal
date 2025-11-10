const express = require('express')
const router = express.Router()
const availabilityController = require('../controllers/drAvailabilityController')

router.post('/add', availabilityController.add)
router.get('/getAll', availabilityController.getAll)
router.get('/getByDr/:id', availabilityController.getByDr)
router.get('/getAvailable', availabilityController.getAvailable)
router.get('/getByDate', availabilityController.getByDate)
router.get('/getByStatus/:status', availabilityController.getByStatus)


module.exports = router