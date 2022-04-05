const { Difficulties } = require('../database')
const { dificultyValidations } = require('../validations/')

const createDifficulty = async (req, res) => {
  try {
    const { body } = req
    await dificultyValidations.validateAsync(body)
    const difficulty = await Difficulties.create(body)
    return res.status(200).json({
      status: 200,
      difficulties: [ difficulty ]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const getDifficulties = async (req, res) => {
  try {
    const difficulties = await Difficulties.findAll()
    return res.status(200).json({
      status: 200,
      difficulties
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

module.exports = {
  createDifficulty,
  getDifficulties
}
