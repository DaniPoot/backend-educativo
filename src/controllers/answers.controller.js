const { Answers } = require('../database')
const { answersValidations } = require('../validations')

const getAllAnswersByUser = async (req, res) => {
  try {
    const { body } = req

    if (!body.created_by) throw new Error('"created_by" field is required')

    const answers = await Answers.findAll({
      where: {
        created_by: body.created_by,
        is_deleted: false
      }
    })
    return res.status(200).json({
      status: 200,
      answers
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const createAnswerByUser = async (req, res) => {
  try {
    const { body } = req
    await answersValidations.validateAsync(body)
    const answer = await Answers.create(body)
    return res.status(201).json({
      status: 201,
      answer
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const updateAnswerById = async (req, res) => {
  try {
    const { body } = req
    const id = req.params.id
    const answer = await Answers.findOne({
      where: {
        id
      }
    })
    await answer.update(body)
    return res.status(200).json({
      status: 200,
      answer
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
  getAllAnswersByUser,
  createAnswerByUser,
  updateAnswerById
}
