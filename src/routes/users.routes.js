const { Router } = require('express')
const { updateUserById, findUserByToken, createResetToken } = require('../controllers/users.controller')
const authMiddleware = require('../middlewares/auth.middleware.js')
const router = Router()

router.put('/', authMiddleware, updateUserById)
router.post('/reset', findUserByToken)
router.post('/create', createResetToken)

module.exports = router
