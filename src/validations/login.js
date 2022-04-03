const Joi = require('joi')

module.exports = Joi.object({
  password: Joi.string().required().min(6).max(40),
  email: Joi.string().required().email()
})

