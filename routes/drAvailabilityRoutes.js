const express = require('express')
const router = express.Router()
const availabilityController = require('../controllers/drAvailabilityController')
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware')

router.post('/add', authenticateToken, authorizeRole('Admin', 'Doctor'),  availabilityController.add)
router.get('/getAll', availabilityController.getAll)
router.get('/getByDr/:id', availabilityController.getByDr)
router.get('/getAvailable', availabilityController.getAvailable)
router.get('/getByDate', availabilityController.getByDate)
router.get('/getByStatus/:status', authenticateToken, authorizeRole('Admin', 'Doctor'), availabilityController.getByStatus)
router.post('/updateStatus', authenticateToken, authorizeRole('Admin', 'Doctor'), availabilityController.updateStatus)
router.delete('/delete/:id', authenticateToken, authorizeRole('Admin', 'Doctor'), availabilityController.delete)

module.exports = router