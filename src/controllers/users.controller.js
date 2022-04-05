const { Users } = require('../database')
const { userValidations, loginValidations } = require('../validations')
const { encryptPassword, isSamePassword } = require('../helpers/encryption.js')
const { generateAccessToken } = require('../helpers/tokens.js')

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

module.exports = {
  createUser,
  findUserWithCredentials
}
