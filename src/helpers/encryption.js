const bcrypt = require('bcrypt')
const SALT = 10

const encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, SALT)
  } catch (error) {
    throw new Error(error)
  }
}

const isSamePassword = async ({password, passwordEncrypted}) => {
  try {
    return bcrypt.compare(password, passwordEncrypted)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  encryptPassword,
  isSamePassword
}
