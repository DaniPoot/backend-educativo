const { Router } = require('express')
const router = Router()
const loginRoutes = require('./login.routes.js')
const answersRoutes = require('./answers.routes.js')
const difficultiesRoutes = require('./difficulties.routes.js')

router.use('/', loginRoutes)
router.use('/answers', answersRoutes)
router.use('/difficulties', difficultiesRoutes)

module.exports = router
