const { Difficulties } = require('../database')
const { dificultyValidations } = require('../validations/')

const createDifficulty = async (req, res) => {
  try {
    const { body } = req
    await dificultyValidations.validateAsync(body)
    const difficulty = await Difficulties.create(body)
    return res.status(200).json({
      status: 200,
      difficulties: [difficulty]
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
    const difficulties = await Difficulties.findAll({ order: [['order']] })
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

const getDifficultiesByUser = async (req, res) => {
  try {
    const { params: { id } } = req
    if (!id) throw new Error('"user id" field is required')

    const difficulties = await Difficulties.findAll({
      where: {
        created_by: id,
        is_deleted: false
      }
    })

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

const getDifficultyById = async (req, res) => {
  try {
    const id = req.params.id
    const difficulty = await Difficulties.findOne({
      where: {
        id
      }
    })
    return res.status(200).json({
      status: 200,
      difficulties: [difficulty]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const updateDifficulty = async (req, res) => {
  try {
    const { body } = req
    const id = req.params.id
    const difficulty = await Difficulties.findOne({
      where: {
        id
      }
    })
    await difficulty.update(body)
    return res.status(200).json({
      status: 200,
      difficulties: [difficulty]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const deleteDifficulty = async (req, res) => {
  try {
    const id = req.params.id

    const difficulty = await Difficulties.findOne({
      where: {
        id
      }
    })
    await difficulty.update({ is_deleted: true })

    return res.status(200).json({
      status: 200,
      difficulties: [difficulty]
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
  getDifficulties,
  getDifficultiesByUser,
  updateDifficulty,
  deleteDifficulty,
  getDifficultyById
}
