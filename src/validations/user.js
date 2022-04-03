const Joi = require('joi')

module.exports = Joi.object({
  full_name: Joi.string().required().trim(),
  user_name: Joi.string().required().trim().max(20),
  password: Joi.string().required().min(6).max(40),
  email: Joi.string().required().email(),
  type: Joi.string().lowercase().require().trim(),
  created_by: Joi.number().greater(0)
})
