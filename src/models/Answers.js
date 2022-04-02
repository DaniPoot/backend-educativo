module.exports = (sequelize, Sequelize) => {
  return sequelize.define('answer', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
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
