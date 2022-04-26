const { Router } = require('express')
const router = Router()
const { getTopic, getAllTopicsByUser, createTopicByUser, updatedTopic, deleteTopic } = require('../controllers/topics.controller.js')

router.get('/', getAllTopicsByUser)
router.post('/create', createTopicByUser)
router.get('/:id', getTopic)
router.put('/:id', updatedTopic)
router.delete('/:id', deleteTopic)

module.exports = router
