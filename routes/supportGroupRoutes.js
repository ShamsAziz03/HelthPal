const supportGroupController= require('../controllers/supportGroupController')
const express = require('express')
const router = express.Router();   

router.post('/addGroup', supportGroupController.addGroup)
router.get('/getGroups', supportGroupController.getGroups)
router.get('/getGroupById/:id', supportGroupController.getGroupById)

module.exports = router