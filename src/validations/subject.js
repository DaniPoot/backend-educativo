const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string().trim().required(),
  created_by: Joi.number().required().greater(0)
})
