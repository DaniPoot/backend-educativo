const { Subjects } = require('../database')
const { subjectValidations } = require('../validations')

const createSubject = async (req, res) => {
  try {
    const { body } = req
    await subjectValidations.validateAsync(body)

    const subject = await Subjects.create(body)

    return res.status(201).json({
      status: 201,
      subjects: [ subject ]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const getSubject = async (req, res) => {
  try {
    const id = req.params.id

    const subject = await Subjects.findOne({ where: { id } })
    return res.status(201).json({
      status: 201,
      subjects: [ subject ]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const updateSubject = async (req, res) => {
  try {
    const { body } = req
    const id = req.params.id

    const subject = await Subjects.findOne({ where: { id } })
    subject.update(body)
    return res.status(201).json({
      status: 201,
      subjects: [ subject ]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const deleteSubject = async (req, res) => {
  try {
    const id = req.params.id

    const subject = await Subjects.findOne({ where: { id } })
    subject.update({ is_deleted: true })
    return res.status(201).json({
      status: 201,
      subjects: [ subject ]
    })
  } catch (e) {
    const error = e.errors ? e.errors[0].message : e.message
    return res.status(500).json({
      status: 500,
      error
    })
  }
}

const getAllSubjectsByUser = async (req, res) => {
  try {
    const { body } = req
    if (!body.created_by) throw new Error('"created_by" field is required')
    const subjects = await Subjects.findAll({ where: { created_by: body.created_by, is_deleted: false } })
    return res.status(201).json({
      status: 201,
      subjects
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
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
  getAllSubjectsByUser
}
