const { Users } = require('../database')
const { userValidations, loginValidations } = require('../validations')
const { encryptPassword, isSamePassword } = require('../helpers/encryption.js')
const { generateAccessToken, generateResetToken, verifyResetToken, verifyAccessToken } = require('../helpers/tokens.js')

const createUser = async (req, res) => {
  try {
    const { body } = req
    await userValidations.validateAsync(body)

    const passwordEncrypted = await encryptPassword(body.password)
    body.password = passwordEncrypted

    const user = await Users.create(body)

    const token = generateAccessToken({ ...user, userId: user.id })

    return res.status(200).json({
      status: 200,
      user,
      token
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const findUserWithCredentials = async (req, res) => {
  try {
    const { body } = req
    await loginValidations.validateAsync(body)
    const user = await Users.findOne({
      where: {
        email: body.email
      }
    })

    const validatePassword = await isSamePassword({
      password: body.password,
      passwordEncrypted: user.password
    })
    if (!validatePassword) throw new Error('Failed to validate user credentials')

    const token = generateAccessToken({ ...user, userId: user.id })

    return res.status(200).json({
      status: 200,
      user,
      token
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(403).json({
      status: 403,
      error: error
    })
  }
}

const createResetToken = async (req, res) => {
  try {
    const { body } = req
    const user = await Users.findOne({
      where: {
        email: body.email
      },
      attributes: {
        exclude: ['password']
      }
    })
    const token = generateResetToken({ ...user, userId: user.id })
    return res.status(200).json({
      status: 200,
      token
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error: error
    })
  }
}

const findUserByToken = async (req, res) => {
  try {
    const { token } = req.headers
    const { body } = req
    const { userId } = verifyResetToken(token)
    const user = await Users.findOne({
      where: {
        id: userId
      },
      attributes: {
        exclude: ['password']
      }
    })
    if (!body.password) throw new Error('"password" field is required')
    const password = await encryptPassword(body.password)
    user.update({ password })
    return res.status(200).json({
      status: 200
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error: error
    })
  }
}

const updateUserById = async (req, res) => {
  try {
    const { body } = req
    const user = await Users.findOne({
      where: {
        id: body.id
      },
      attributes: {
        exclude: ['password']
      }
    })
    user.update({ body })
    return res.status(200).json({
      status: 200
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error: error
    })
  }
}

const verifyAuthToken = async (req, res) => {
  try {
    const { body: { token, userId: id } } = req
    if (!id) throw new Error('"userId" field is required')
    const { userId } = verifyAccessToken(token)
    if (!userId === id) throw new Error('Invalid autorization token')

    const user = await Users.findOne({
      where: {
        id
      }
    })

    const newToken = generateAccessToken({ ...user, userId })

    return res.status(200).json({
      status: 200,
      user,
      token: newToken
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error: error
    })
  }
}

module.exports = {
  createUser,
  findUserWithCredentials,
  createResetToken,
  findUserByToken,
  updateUserById,
  verifyAuthToken
}
