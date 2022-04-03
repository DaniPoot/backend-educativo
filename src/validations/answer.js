const Joi = require('joi')

module.exports = Joi.object({
  description: Joi.string().require().trim(),
  created_by: Joi.number().required().greater(0)
})
