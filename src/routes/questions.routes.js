const { Router } = require('express')
const router = Router()

const { createQuestionByUser, getAllQuestionByUser, updateQuestion, deleteQuestion } = require('../controllers/questions.controller.js')

router.post('/create', createQuestionByUser)
router.get('/', getAllQuestionByUser)
router.put('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)

module.exports = router
