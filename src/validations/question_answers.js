const Joi = require('joi')

module.exports = Joi.object({
  question: Joi.number().required().greater(0),
  answer: Joi.number().required().greater(0),
  is_correct: Joi.boolean().required(),
  created_by: Joi.number().required().greater(0)
})
