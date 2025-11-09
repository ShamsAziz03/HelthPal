const express = require('express')
const router = express.Router()
const collaborationController = require('../controllers/collaborationController')

router.post('/add', collaborationController.add)

module.exports = router