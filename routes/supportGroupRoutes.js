const supportGroupController= require('../controllers/supportGroupController')
const express = require('express')
const router = express.Router();   

router.post('/addGroup', supportGroupController.addGroup)
router.get('/getGroups', supportGroupController.getGroups)
router.get('/getGroupById/:id', supportGroupController.getGroupById)
router.delete('/deleteGroup/:id', supportGroupController.deleteGroup)

router.post('/joinGroup', supportGroupController.joinGroup)
router.get('/getGroupMembers/:id', supportGroupController.getGroupMembers)
router.get('/getAllMembers', supportGroupController.getAllMembers)
router.delete('/removeMember/:memberId', supportGroupController.removeMember)
module.exports = router