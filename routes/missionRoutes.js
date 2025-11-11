const express = require('express')
const router = express.Router() 
const missionController = require('../controllers/missionController')

router.post('/add', missionController.add)
router.get('/getAll', missionController.getAll)
router.get('/getById/:id', missionController.getById)

module.exports = router