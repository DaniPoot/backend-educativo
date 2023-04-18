const { Router } = require('express')
const router = Router()

const { getAllAnswersByUser, createAnswerByUser, updateAnswerById, verifyAnswer, getAnswersByQuestionId, updateAnswerRelation } = require('../controllers/answers.controller.js')

router.post('/create', createAnswerByUser)
router.get('/', getAllAnswersByUser)
router.put('/:id', updateAnswerById)
router.delete('/:id', updateAnswerById)
router.post('/verify', verifyAnswer)
router.get('/question/:id', getAnswersByQuestionId)
router.post('/relation/:id', updateAnswerRelation)

module.exports = router
