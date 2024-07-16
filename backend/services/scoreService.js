const { scores, quizzes, users, answers } = require("../models");

const findAll = async (params) => {
  const userId = params.userId;
  const score = await scores.findAll({
    where: {
      userId: +userId,
    },
    include: [
      {
        model: users,
        attributes: ["name"],
      },
      {
        model: quizzes,
        attributes: ["title"],
      },
    ],
  });

  return score;
};

const findOne = async (params) => {
  const { id, userId } = params;
  const score = await scores.findOne({
    where: {
      id: +id,
      userId: userId,
    },
    include: [
      {
        model: users,
        attributes: ["name"],
      },
      {
        model: quizzes,
        attributes: ["title"],
      },
    ],
  });

  if (!score) {
    throw {
      name: "ErrorNotFound",
    };
  }

  return score;
};

const create = async (params) => {
  const score = await scores.create({
    userId: params.userId,
    quizId: params.quizId,
    score: params.score,
  });

  return score;
};

const destroy = async (params) => {
  const { id, userId } = params;

  const score = await scores.findOne({
    where: {
      id: +id,
      userId: +userId,
    },
  });

  if (!score) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await score.destroy();

  return score;
};

module.exports = { findAll, findOne, create, destroy };
