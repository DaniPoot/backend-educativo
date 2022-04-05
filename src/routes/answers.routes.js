const { Router } = require('express')
const router = Router()

const { getAllAnswersByUser, createAnswerByUser, updateAnswerById } = require('../controllers/answers.controller.js')

router.post('/create', createAnswerByUser)
router.get('/', getAllAnswersByUser)
router.put('/:id', updateAnswerById)

module.exports = router
