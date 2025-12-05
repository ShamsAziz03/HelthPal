const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware')

router.post('/add', authenticateToken, authorizeRole('Admin', 'Patient'), bookingController.add)
router.get('/getAll', authenticateToken, authorizeRole('Admin'), bookingController.getAll)
router.get('/getByPatient/:patientId', authenticateToken, authorizeRole('Admin'), bookingController.getByPatient)
router.post('/updateStatus', authenticateToken, authorizeRole('Doctor'), bookingController.updateStatus)
router.delete('/delete/:id',authenticateToken, authorizeRole('Admin'), bookingController.delete)

module.exports = router
