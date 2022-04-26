const { Router } = require('express')
const router = Router()
const { createSubject, getAllSubjectsByUser, updateSubject, deleteSubject, getSubject } = require('../controllers/subjects.controller.js')

router.get('/', getAllSubjectsByUser)
router.post('/create', createSubject)
router.get('/:id', getSubject)
router.put('/:id', updateSubject)
router.deleted('/:id', deleteSubject)

module.exports = router
