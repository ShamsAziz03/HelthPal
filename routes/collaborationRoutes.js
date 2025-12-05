const express = require('express')
const router = express.Router()
const collaborationController = require('../controllers/collaborationController')
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware')

router.post('/add', authenticateToken, authorizeRole('Admin', 'NGO'), collaborationController.add)
router.post('/updateStatus', authenticateToken, authorizeRole('Admin', 'NGO'), collaborationController.updateStatus)
router.get('/', collaborationController.getAll)
router.get('/:id', collaborationController.getById)
router.delete('/delete/:id', authenticateToken, authorizeRole('Admin', 'NGO'), collaborationController.delete)
module.exports = router