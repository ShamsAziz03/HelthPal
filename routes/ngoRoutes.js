const express = require('express')
const router = express.Router()
const ngoController = require('../controllers/ngoController')

router.post('/add', ngoController.add)
router.delete('/:id', ngoController.delete)
router.get('/', ngoController.getAll)
router.get('/:id', ngoController.getById)
router.get('/search', ngoController.search)
router.get('/verified', ngoController.getVerified)
router.put('/verify/:ngoId', ngoController.verify)

module.exports = router