const { Router } = require('express')
const router = Router()
const loginRoutes = require('./login.routes.js')
const answersRoutes = require('./answers.routes.js')
const difficultiesRoutes = require('./difficulties.routes.js')
const questionsRouters = require('./questions.routes.js')
const topicsRouters = require('./topics.routes.js')
const subjectsRouters = require('./subjects.routes.js')

router.use('/', loginRoutes)
router.use('/answers', answersRoutes)
router.use('/difficulties', difficultiesRoutes)
router.use('/questions', questionsRouters)
router.use('/topics', topicsRouters)
router.use('/subjects', subjectsRouters)

module.exports = router
