const { Router } = require('express')
const router = Router()

const { createQuestionByUser, getAllQuestionByUser, updateQuestion, deleteQuestion, getQuestionByTopicsAndDifficulties, assignAnswersToQuestions } = require('../controllers/questions.controller.js')

router.post('/create', createQuestionByUser)
router.get('/user/:id', getAllQuestionByUser)
router.post('/random', getQuestionByTopicsAndDifficulties)
router.put('/:id', updateQuestion)
router.post('/:id', assignAnswersToQuestions)
router.delete('/:id', deleteQuestion)

module.exports = router
