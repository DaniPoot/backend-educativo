const { Router } = require('express')
const router = Router()

const { createQuestionByUser, getAllQuestionByUser, updateQuestion, deleteQuestion, getQuestionByTopicsAndDifficulties } = require('../controllers/questions.controller.js')

router.post('/create', createQuestionByUser)
router.get('/', getAllQuestionByUser)
router.get('/random', getQuestionByTopicsAndDifficulties)
router.put('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)

module.exports = router
