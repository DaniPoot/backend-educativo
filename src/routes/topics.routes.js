const { Router } = require('express')
const router = Router()
const { getAllTopics, getTopic, getAllTopicsByUser, createTopicByUser, updatedTopic, deleteTopic, getAllTopicsBySubject } = require('../controllers/topics.controller.js')

router.get('/', getAllTopics)
router.get('/subject/:id', getAllTopicsBySubject)
router.get('/user/:id', getAllTopicsByUser)
router.post('/create', createTopicByUser)
router.get('/:id', getTopic)
router.put('/:id', updatedTopic)
router.delete('/:id', deleteTopic)

module.exports = router
