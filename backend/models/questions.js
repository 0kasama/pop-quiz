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
        foreignKey: "quiz_id",
      });

      questions.hasMany(models.answers, {
        foreignKey: "question_id",
      });
    }
  }
  questions.init(
    {
      quiz_id: DataTypes.INTEGER,
      question: DataTypes.TEXT,
    },
    {
      sequelize,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      modelName: "questions",
      timestamps: true,
    }
  );
  return questions;
};
