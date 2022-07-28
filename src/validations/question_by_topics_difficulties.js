const Joi = require('joi')

module.exports = Joi.object({
  topics: Joi.array().items(Joi.number()).required().min(1),
  difficulties: Joi.array().items(Joi.number()).required().min(1)
})

