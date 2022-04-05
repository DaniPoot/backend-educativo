const { Router } = require('express')
const router = Router()

const { createUser, findUserWithCredentials } = require('../controllers/users.controller.js')

router.post('/login', findUserWithCredentials)
router.post('/sigin', createUser)

module.exports = router
