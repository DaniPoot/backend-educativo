require('dotenv').config()

const db = require('./src/database')
const app = require('./src/app.js')

db.sequelize.sync()
db.sequelize.authenticate()
  .then(() => console.log('DB connection success'))
  .catch(() => console.log('DB connection fail'))

app.listen(process.env.PORT, () => { console.log('Server online on port: ', process.env.PORT) })
