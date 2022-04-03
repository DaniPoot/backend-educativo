const Joi = require('joi')

module.exports = Joi.object({
  description: Joi.string().required().trim(),
  id_topic: Joi.number().required().greater(0),
  id_difficulty: Joi.number().required().greater(0),
  created_by: Joi.number().required().greater(0)
})
