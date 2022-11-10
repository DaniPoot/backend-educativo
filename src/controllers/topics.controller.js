const { Topics } = require('../database')
const { topicValidations } = require('../validations')

const createTopicByUser = async (req, res) => {
  try {
    const { body } = req
    await topicValidations.validateAsync(body)

    const topic = await Topics.create(body)

    return res.status(201).json({
      status: 201,
      topics: [ topic ]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const getTopic = async (req, res) => {
  try {
    const id = req.params.id

    const topic = await Topics.findOne({ where: { id } })

    return res.status(201).json({
      status: 201,
      topics: [ topic ]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const updatedTopic = async (req, res) => {
  try {
    const { body } = req
    const id = req.params.id

    const topic = await Topics.findOne({ where: { id } })
    topic.update(body)

    return res.status(201).json({
      status: 201,
      topics: [ topic ]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const deleteTopic = async (req, res) => {
  try {
    const id = req.params.id

    const topic = await Topics.findOne({ where: { id } })
    topic.update({ is_deleted: true })

    return res.status(201).json({
      status: 201,
      topics: [ topic ]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const getAllTopicsByUser = async (req, res) => {
  try {
    const { body } = req
    if (!body.created_by) throw new Error('"created_by" field is required')

    const topics = await Topics.findAll({ where: { created_by: body.created_by, is_deleted: false } })

    return res.status(201).json({
      status: 201,
      topics
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const getAllTopicsBySubject = async (req, res) => {
  try {
    const { id: subjectId } = req.params
    if (!subjectId) throw new Error('"id_subject" field is required')

    const topics = await Topics.findAll({ where: { id_subject: subjectId, is_deleted: false } })
    console.log({ topics })

    return res.status(200).json({
      status: 200,
      topics
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
  getTopic,
  createTopicByUser,
  updatedTopic,
  deleteTopic,
  getAllTopicsByUser,
  getAllTopicsBySubject
}
