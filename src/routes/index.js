const { Router } = require('express')
const router = Router()
const loginRoutes = require('./login.routes.js')
const answersRoutes = require('./answers.routes.js')
const difficultiesRoutes = require('./difficulties.routes.js')
const questionsRouters = require('./questions.routes.js')
const topicsRouters = require('./topics.routes.js')
const subjectsRouters = require('./subjects.routes.js')
const userRoutes = require('./users.routes.js')

const authMiddleware = require('../middlewares/auth.middleware.js')

router.use('/', loginRoutes)
router.use('/answers', authMiddleware, answersRoutes)
router.use('/difficulties', authMiddleware, difficultiesRoutes)
router.use('/questions', authMiddleware, questionsRouters)
router.use('/topics', authMiddleware, topicsRouters)
router.use('/subjects', authMiddleware, subjectsRouters)
router.use('/user', userRoutes)

module.exports = router
