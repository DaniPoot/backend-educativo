const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', routes)

module.exports = app
