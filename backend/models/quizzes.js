'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quizzes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      quizzes.belongsTo(models.users, {
        foreignKey: "user_id"
      })
    }
  }
  quizzes.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'quizzes',
    timestamps: true
  });
  return quizzes;
};