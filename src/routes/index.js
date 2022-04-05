const { Router } = require('express')
const router = Router()
const loginRoutes = require('./login.routes.js')
const answersRoutes = require('./answers.routes.js')

router.use('/', loginRoutes)
router.use('/answers', answersRoutes)

module.exports = router
