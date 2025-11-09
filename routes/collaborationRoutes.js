const express = require('express')
const router = express.Router()
const collaborationController = require('../controllers/collaborationController')

router.post('/add', collaborationController.add)
router.post('/updateStatus', collaborationController.updateStatus)
router.get('/', collaborationController.getAll)
router.get('/:id', collaborationController.getById)
module.exports = router