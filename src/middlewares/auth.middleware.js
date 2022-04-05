const { verifyAccessToken } = require('../helpers/tokens.js')

const auth = (req, res, next) => {
  try {
    const { headers: { authorization } } = req
    if (!authorization || !authorization.includes('Bearer')) throw new Error('Missing Authentication Token')
    const token = authorization.split(' ')[1]
    const { userId } = verifyAccessToken(token)
    if (!req.body.userId && req.body.userId !== userId) {
      throw new Error('Invalid User ID')
    } else {
      next()
    }
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: error.message
    })
  }
}

module.exports = auth
