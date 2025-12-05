const supportGroupController= require('../controllers/supportGroupController')
const express = require('express')
const { authenticateToken , authorizeRole} = require('../middleware/authMiddleware')
const router = express.Router();   

router.post('/addGroup', authenticateToken, authorizeRole('Admin', 'Patient'), supportGroupController.addGroup)
router.get('/getGroups', authenticateToken, authorizeRole('Admin', 'Patient'), supportGroupController.getGroups)
router.get('/getGroupById/:id', authenticateToken, authorizeRole('Admin', 'Patient'), supportGroupController.getGroupById)
router.delete('/deleteGroup/:id', authenticateToken, authorizeRole('Admin'), supportGroupController.deleteGroup)
router.post('/updateName/:id', authenticateToken, authorizeRole('Admin', 'Patient'), supportGroupController.updateName)
router.post('/updateDescription/:id', authenticateToken, authorizeRole('Admin', 'Patient'), supportGroupController.updateDescription)

router.post('/joinGroup', authenticateToken, authorizeRole('Patient'), supportGroupController.joinGroup)
router.get('/getGroupMembers/:id', authenticateToken, authorizeRole('Admin', 'Patient'), supportGroupController.getGroupMembers)
router.get('/getAllMembers', authenticateToken, authorizeRole('Admin', 'Patient'), supportGroupController.getAllMembers)
router.delete('/removeMember/:memberId', authenticateToken, authorizeRole('Admin'), supportGroupController.removeMember)

router.post('/sendGroupMessage', authenticateToken, authorizeRole('Patient'), supportGroupController.sendGroupMsg)
router.get('/getGroupMessages/:groupId', authenticateToken, authorizeRole('Patient'), supportGroupController.getGroupMsgs)
router.delete('/deleteGroupMessages/:groupId', authenticateToken, authorizeRole('Admin'), supportGroupController.deleteGroupMsgs)
module.exports = router