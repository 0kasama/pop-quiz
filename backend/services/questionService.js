const { questions, answers } = require("../models");

const findAll = async (quizId) => {
  const whereOptions = {};
  if (quizId) {
    whereOptions.quizId = parseInt(quizId);
  }

  return questions.findAll({
    where: whereOptions,
    include: [
      {
        model: answers,
        attributes: ["answer", "isCorrect"],
      },
    ],
  });
};

const findOne = async (params) => {
  const { id } = params;
  const question = await questions.findOne({
    where: {
      id: +id,
    },
    include: [
      {
        model: answers,
        attributes: ["answer", "isCorrect"],
      },
    ],
  });

  if (!question) {
    throw {
      name: "ErrorNotFound",
    };
  }

  return question;
};

const create = async (params) => {
  const question = await questions.create({
    quizId: params.quizId,
    question: params.question,
  });

  return question;
};

const update = async (params) => {
  const { id, data } = params;

  const question = await questions.findOne({
    where: {
      id: +id,
    },
  });

  if (!question) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await question.update(data);
};

const destroy = async (params) => {
  const { id } = params;

  const question = await questions.findOne({
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
