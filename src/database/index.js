const dbConfig = require('../configs/db.config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig)
const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

const Answers = require('../models/Answers.js')(sequelize, Sequelize)
const Difficulties = require('../models/Difficulties.js')(sequelize, Sequelize)
const QuestionsAnswers = require('../models/Questions_Answers.js')(sequelize, Sequelize)
const Questions = require('../models/Questions.js')(sequelize, Sequelize)
const Subjects = require('../models/Subjects.js')(sequelize, Sequelize)
const Topics = require('../models/Topics.js')(sequelize, Sequelize)
const Users = require('../models/Users.js')(sequelize, Sequelize)

Questions.hasMany(QuestionsAnswers, {
  foreignKey: {
    name: 'id_question'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Answers.hasMany(QuestionsAnswers, {
  foreignKey: {
    name: 'id_answer'
  },
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
})

Difficulties.hasMany(Questions, {
  foreignKey: {
    name: 'id_difficulty'
  },
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
})

Topics.hasMany(Questions, {
  foreignKey: {
    name: 'id_topic'
  },
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
})

Subjects.hasMany(Topics, {
  foreignKey: {
    name: 'id_subject'
  },
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
})

Users.hasMany(Answers, {
  foreignKey: {
    name: 'created_by'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Users.hasMany(Difficulties, {
  foreignKey: {
    name: 'create_by'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Users.hasMany(QuestionsAnswers, {
  foreignKey: {
    name: 'create_by'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Users.hasMany(Questions, {
  foreignKey: {
    name: 'create_by'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Users.hasMany(Subjects, {
  foreignKey: {
    name: 'create_by'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Users.hasMany(Topics, {
  foreignKey: {
    name: 'create_by'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Users.hasMany(Users, {
  foreignKey: {
    name: 'create_by'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

db.Answers = Answers
db.Difficulties = Difficulties
db.QuestionsAnswers = QuestionsAnswers
db.Questions = Questions
db.Subjects = Subjects
db.Topics = Topics
db.Users = Users

module.exports = db
