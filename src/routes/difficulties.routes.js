const { Router } = require('express')
const router = Router()

const { createDifficulty, getDifficultiesByUser, updateDifficulty, deleteDifficulty, getDifficulties, getDifficultyById } = require('../controllers/difficulties.controller.js')

router.post('/create', createDifficulty)
router.get('/', getDifficulties)
router.get('/user/:id', getDifficultiesByUser)
router.get('/:id', getDifficultyById)
router.put('/:id', updateDifficulty)
router.delete('/:id', deleteDifficulty)

module.exports = router
