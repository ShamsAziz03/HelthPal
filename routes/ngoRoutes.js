const express = require('express')
const router = express.Router()
const ngoController = require('../controllers/ngoController')

router.post('/add', ngoController.add)
router.delete('/delete/:id', ngoController.delete)
router.get('/getAll', ngoController.getAll)
router.get('/getById/:id', ngoController.getById)
router.get('/search', ngoController.search)
router.get('/verified', ngoController.getVerified)
router.put('/verify/:ngoId', ngoController.verify)

module.exports = router