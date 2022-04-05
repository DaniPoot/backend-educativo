const { Router } = require('express')
const router = Router()

const { createDifficulty, getDifficulties } = require('../controllers/difficulties.controller.js')

router.post('/create', createDifficulty)
router.get('/', getDifficulties)

module.exports = router
