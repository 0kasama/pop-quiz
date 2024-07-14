"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      questions.belongsTo(models.quizzes, {
        foreignKey: "quizId",
      });

      questions.hasMany(models.answers, {
        foreignKey: "questionId",
      });
    }
  }
  questions.init(
    {
      quizId: DataTypes.INTEGER,
      question: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "questions",
      timestamps: true,
    }
  );
  return questions;
};
