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
        foreignKey: "userId"
      })

      scores.belongsTo(models.quizzes, {
        foreignKey: "quizId"
      })
    }
  }
  scores.init({
    userId: DataTypes.INTEGER,
    quizId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'scores',
    timestamps: true
  });
  return scores;
};