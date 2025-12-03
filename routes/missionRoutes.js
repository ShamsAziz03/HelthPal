const express = require('express')
const router = express.Router() 
const missionController = require('../controllers/missionController')
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware')

router.post('/add', authenticateToken, authorizeRole('Admin', 'NGO'), missionController.add)
router.get('/getAll', authenticateToken, authorizeRole('Admin'), missionController.getAll)
router.get('/getById/:id', authenticateToken, authorizeRole('Admin'), missionController.getById)
router.post('/updateTitle/:id', authenticateToken, authorizeRole('Admin'), missionController.updateTitle)
router.post('/updateDescription/:id', authenticateToken, authorizeRole('Admin'), missionController.updateDescription)
router.post('/updateLocation/:id', authenticateToken, authorizeRole('Admin'), missionController.updateLocation)
router.post('/updateDates/:id', authenticateToken, authorizeRole('Admin'), missionController.updateDates)
router.delete('/delete/:id', authenticateToken, authorizeRole('Admin'), missionController.delete)

module.exports = router