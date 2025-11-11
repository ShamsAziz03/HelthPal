const express = require('express')
const router = express.Router() 
const missionController = require('../controllers/missionController')

router.post('/add', missionController.add)
router.get('/getAll', missionController.getAll)
router.get('/getById/:id', missionController.getById)
router.post('/updateTitle/:id', missionController.updateTitle)
router.post('/updateDescription/:id', missionController.updateDescription)
router.post('/updateLocation/:id', missionController.updateLocation)
router.post('/updateDates/:id', missionController.updateDates)

module.exports = router