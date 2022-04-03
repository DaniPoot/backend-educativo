const jwt = require('jsonwebtoken')
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET
const RESET_TOKEN = process.env.RESET_TOKEN_SECRET

const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN, {expiresIn: '24h'})
}

const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN)
}

const generateResetToken = (payload) => {
  return jwt.sign(payload, RESET_TOKEN, { expiresIn: '10m' })
}

const verifyResetToken = (token) => {
  return jwt.verify(token, RESET_TOKEN)
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateResetToken,
  verifyResetToken
}
