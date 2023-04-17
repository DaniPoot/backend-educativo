const { Router } = require('express')
const router = Router()

const { getAllAnswersByUser, createAnswerByUser, updateAnswerById, verifyAnswer, getAnswersByQuestionId } = require('../controllers/answers.controller.js')

router.post('/create', createAnswerByUser)
router.get('/', getAllAnswersByUser)
router.put('/:id', updateAnswerById)
router.delete('/:id', updateAnswerById)
router.post('/verify', verifyAnswer)
router.get('/question/:id', getAnswersByQuestionId)

module.exports = router
