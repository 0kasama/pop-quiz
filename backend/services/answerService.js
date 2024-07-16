const { answers, questions, scores } = require("../models");

const findAll = async (questionId) => {
  const whereOptions = {};
  if (questionId) {
    whereOptions.questionId = parseInt(questionId);
  }
  return answers.findAll({
    where: whereOptions,
    include: [
      {
        model: questions,
        attributes: ["question"],
      },
    ],
  });
};

const findOne = async (params) => {
  const { id } = params;
  const answer = await answers.findOne({
    where: {
      id: +id,
    },
    include: [
      {
        model: questions,
        attributes: ["question"],
      },
    ],
  });

  if (!answer) {
    throw {
      name: "ErrorNotFound",
    };
  }

  return answer;
};

const create = async (params) => {
  const answer = await answers.create({
    questionId: params.questionId,
    answer: params.answer,
    isCorrect: params.isCorrect,
  });

  return answer;
};

const update = async (params) => {
  const { id, data } = params;

  const answer = await answers.findOne({
    where: {
      id: +id,
    },
  });

  if (!answer) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await answer.update(data);
};

const destroy = async (params) => {
  const { id } = params;

  const question = await answers.findOne({
    where: {
      id: +id,
    },
  });

  if (!question) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await question.destroy();

  return question;
};

module.exports = { findAll, findOne, create, update, destroy };
