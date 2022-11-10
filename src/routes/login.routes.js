const { Router } = require('express')
const router = Router()

const { createUser, findUserWithCredentials, verifyAuthToken } = require('../controllers/users.controller.js')

router.post('/login', findUserWithCredentials)
router.post('/sigin', createUser)
router.post('/verify', verifyAuthToken)

module.exports = router
