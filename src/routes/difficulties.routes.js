const { Router } = require('express')
const router = Router()

const { createDifficulty, getDifficultiesByUser, updateDifficulty, deleteDifficulty, getDifficulties } = require('../controllers/difficulties.controller.js')

router.post('/create', createDifficulty)
router.get('/', getDifficulties)
router.get('/user/:id', getDifficultiesByUser)
router.put('/', updateDifficulty)
router.delete('/', deleteDifficulty)

module.exports = router
