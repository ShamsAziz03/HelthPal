const supportGroupController= require('../controllers/supportGroupController')
const express = require('express')
const router = express.Router();   

router.post('/addGroup', supportGroupController.addGroup)
router.get('/getGroups', supportGroupController.getGroups)
router.get('/getGroupById/:id', supportGroupController.getGroupById)
router.delete('/deleteGroup/:id', supportGroupController.deleteGroup)
router.post('/updateName/:id', supportGroupController.updateName)
router.post('/updateDescription/:id', supportGroupController.updateDescription)

router.post('/joinGroup', supportGroupController.joinGroup)
router.get('/getGroupMembers/:id', supportGroupController.getGroupMembers)
router.get('/getAllMembers', supportGroupController.getAllMembers)
router.delete('/removeMember/:memberId', supportGroupController.removeMember)

router.post('/sendGroupMessage', supportGroupController.sendGroupMsg)
router.get('/getGroupMessages/:groupId', supportGroupController.getGroupMsgs)
router.delete('/deleteGroupMessages/:groupId', supportGroupController.deleteGroupMsgs)
module.exports = router