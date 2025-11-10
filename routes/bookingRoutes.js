const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')

router.post('/add', bookingController.add)
router.get('/getAll', bookingController.getAll)
router.get('/getByPatient/:patientId', bookingController.getByPatient)
router.post('/updateStatus', bookingController.updateStatus)
router.delete('/delete/:id',bookingController.delete)

module.exports = router
