'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      answers.belongsTo(models.questions, {
        foreignKey: "questionId",
      });
    }
  }
  answers.init({
    question_id: DataTypes.INTEGER,
    answer: DataTypes.TEXT,
    is_correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'answers',
    timestamps: true
  });
  return answers;
};