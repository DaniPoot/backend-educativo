module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM(['student', 'professor', 'administrator']),
      defaultValue: 'student'
    },
    reset_token : {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
