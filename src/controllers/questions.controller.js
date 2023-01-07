const { Questions, sequelize, Answers, Difficulties, Topics, Subjects } = require('../database')
const { questionValidations, questionsByTopicsDifficulties } = require('../validations')

const createQuestionByUser = async (req, res) => {
  try {
    const { body } = req
    await questionValidations.validateAsync(body)

    const question = await Questions.create(body)

    return res.status(201).json({
      status: 201,
      questions: [question]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const getAllQuestionByUser = async (req, res) => {
  try {
    const { params: { id } } = req
    if (!id) throw new Error('"user_id" field is required')
    const questions = await Questions.findAll({
      where: {
        created_by: id,
        is_deleted: false
      },
      include: [
        { model: Difficulties, attributes: ['name'] },
        {
          model:
            Topics,
          attributes: ['name'],
          include: [
            { model: Subjects, attributes: ['name'] }
          ]
        }
      ]
    })
    return res.status(201).json({
      status: 201,
      questions
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const updateQuestion = async (req, res) => {
  try {
    const { body } = req
    const id = req.params.id
    const question = await Questions.findOne({ where: { id } })
    question.update(body)
    return res.status(201).json({
      status: 201,
      questions: [question]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id
    const question = await Questions.findOne({ where: { id } })
    question.update({ is_deleted: true })
    return res.status(201).json({
      status: 201,
      questions: [question]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const assignAnswersToQuestions = async (req, res) => {
  try {
    const { params: { id }, body: { answers: answersBody } } = req

    const answersId = answersBody.map(answer => answer.id)
    const question = await Questions.findOne({ where: { id }, include: [Answers] })
    const answers = await Answers.findAll({ where: { id: answersId } })

    for (const answer of answers) {
      const answerBody = answersBody.find(a => a.id === answer.id)
      await question.addAnswer(answer, { through: { is_correct: answerBody.is_correct, created_by: answerBody.created_by } })
    }

    const newAnsers = await question.getAnswers({
      attributes: ['id', 'description'],
      through: {
        where: {
          is_deleted: false
        }
      },
      joinTableAttributes: ['is_correct']
    })

    return res.status(201).json({
      status: 201,
      questions: [{
        ...question.dataValues,
        answers: newAnsers
      }]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const getQuestionByTopicsAndDifficulties = async (req, res) => {
  try {
    const { body } = req
    await questionsByTopicsDifficulties.validateAsync(body)
    const { topics, difficulties } = body

    const questions = await Questions.findAll({
      where: {
        id_topic: topics,
        id_difficulty: difficulties,
        is_deleted: false
      },
      limit: 50,
      attributes: ['id', 'description', 'id_topic', 'id_difficulty'],
      order: sequelize.random()
    })

    const newQuestions = []
    for (const question of questions) {
      const answersFail = await question.getAnswers({
        limit: 2,
        attributes: ['id', 'description'],
        through: {
          where: {
            is_deleted: false,
            is_correct: false
          }
        },
        joinTableAttributes: []
      })
      const answersCorrect = await question.getAnswers({
        limit: 1,
        attributes: ['id', 'description'],
        through: {
          where: {
            is_deleted: false,
            is_correct: true
          }
        },
        joinTableAttributes: []
      })
      newQuestions.push({
        ...question.dataValues,
        answers: [...answersFail, ...answersCorrect]
      })
    }

    return res.status(201).json({
      status: 201,
      questions: newQuestions
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
  createQuestionByUser,
  getAllQuestionByUser,
  updateQuestion,
  deleteQuestion,
  assignAnswersToQuestions,
  getQuestionByTopicsAndDifficulties
}
