const { Router } = require('express')
const router = Router()
const loginRoutes = require('./login.routes.js')

router.use('/', loginRoutes)

module.exports = router
