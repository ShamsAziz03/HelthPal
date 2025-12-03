const express = require('express')
const router = express.Router()
const ngoController = require('../controllers/ngoController')
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware')

router.get('/getAll', ngoController.getAll)
router.get('/getById/:id', ngoController.getById)
router.get('/search', ngoController.search)
router.get('/verified', ngoController.getVerified)

router.post('/add', authenticateToken, authorizeRole('Admin'), ngoController.add)
router.delete('/delete/:id', authenticateToken, authorizeRole('Admin'), ngoController.delete)
router.put('/verify/:ngoId', authenticateToken, authorizeRole('Admin'), ngoController.verify)

module.exports = router