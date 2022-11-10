const { Router } = require('express')
const router = Router()
const { createSubject, getAllSubjectsByUser, updateSubject, deleteSubject, getSubject, getAllSubjectsByQuery, getAllSubjects } = require('../controllers/subjects.controller.js')

router.get('/', getAllSubjects)
router.get('/user/:id', getAllSubjectsByUser)
router.post('/create', createSubject)
router.get('/search', getAllSubjectsByQuery)
router.get('/:id', getSubject)
router.put('/:id', updateSubject)
router.delete('/:id', deleteSubject)

module.exports = router
