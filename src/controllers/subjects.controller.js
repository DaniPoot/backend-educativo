const { Op } = require('sequelize')
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
    const { params: { id } } = req
    if (!id) throw new Error('"id" param is required')
    const subjects = await Subjects.findAll({ where: { created_by: id, is_deleted: false } })
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

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subjects.findAll({ where: { is_deleted: false } })
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

const getAllSubjectsByQuery = async (req, res) => {
  try {
    const { query: { query } } = req
    if (!query) throw new Error('"query" param is required')
    const subjects = await Subjects.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`
         },
        is_deleted: false
      },
      attributes: ['id', 'name']
    })

    return res.status(201).json({
      status: 200,
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
  getAllSubjectsByUser,
  getAllSubjects,
  getAllSubjectsByQuery
}
