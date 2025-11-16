const supportGroupController= require('../controllers/supportGroupController')
const express = require('express')
const router = express.Router();   

router.post('/addGroup', supportGroupController.addGroup)

module.exports = router