const { Router } = require('express')
const router = Router()

const { createDifficulty, getDifficultiesByUser } = require('../controllers/difficulties.controller.js')

router.post('/create', createDifficulty)
router.get('/', getDifficultiesByUser)

module.exports = router
