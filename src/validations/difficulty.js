const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string().required().trim(),
  order: Joi.number().required().greater(0),
  created_by: Joi.number().required().greater(0)
})
