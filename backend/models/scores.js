'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      scores.belongsTo(models.users, {
        foreignKey: "user_id"
      })

      scores.belongsTo(models.quizzes, {
        foreignKey: "quiz_id"
      })
    }
  }
  scores.init({
    user_id: DataTypes.INTEGER,
    quiz_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'scores',
    timestamps: true
  });
  return scores;
};