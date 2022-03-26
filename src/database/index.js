const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig)
const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
