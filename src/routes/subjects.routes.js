const { Router } = require('express')
const router = Router()
const { createSubject, getAllSubjectsByUser, updateSubject, deleteSubject, getSubject, getAllSubjectsByQuery } = require('../controllers/subjects.controller.js')

router.get('/', getAllSubjectsByUser)
router.post('/create', createSubject)
router.get('/search', getAllSubjectsByQuery)
router.get('/:id', getSubject)
router.put('/:id', updateSubject)
router.delete('/:id', deleteSubject)

module.exports = router
