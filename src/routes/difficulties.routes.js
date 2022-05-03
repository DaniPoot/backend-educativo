const { Router } = require('express')
const router = Router()

const { createDifficulty, getDifficultiesByUser, updateDifficulty, deleteDifficulty } = require('../controllers/difficulties.controller.js')

router.post('/create', createDifficulty)
router.get('/', getDifficultiesByUser)
router.put('/', updateDifficulty)
router.delete('/', deleteDifficulty)

module.exports = router
