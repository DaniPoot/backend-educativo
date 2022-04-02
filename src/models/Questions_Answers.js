module.exports = (sequelize, Sequelize) => {
  return sequelize.define('questions_answers', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    is_correct: {
      type: Sequelize.BOOLEAN
    },
    deleted_at: {
      type: Sequelize.DATE
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
