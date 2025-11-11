const express = require('express')
const router = express.Router() 
const missionController = require('../controllers/missionController')

router.post('/add', missionController.add)

module.exports = router