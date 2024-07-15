const { quizzes, users } = require("../models");
const crypto = require("crypto");

const generateSlug = async () => {
  let slug;
  let isUnique = false;

  while (!isUnique) {
    slug = crypto.randomBytes(3).toString("hex");
    const existingImage = await quizzes.findOne({ where: { slug } });
    if (!existingImage) {
      isUnique = true;
    }
  }
  return slug;
};

const findAll = async () => {
  const quiz = await quizzes.findAll();

  return quiz;
};

const findOne = async (params) => {
  const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);
  const filterOption = {
    where: {},
  };

  if (isNumeric(params.id) === false) {
    filterOption.where.slug = params.id;
  } else {
    filterOption.where.id = +params.id;
  }

  filterOption.include = [
    {
      model: users,
      attributes: ["name"],
    },
  ];

  const quiz = await quizzes.findOne(filterOption);

  return quiz;
};

const create = async (params) => {
  const slug = await generateSlug();

  const quiz = await quizzes.create({
    userId: params.userId,
    title: params.title,
    slug: slug,
  });

  return quiz;
};

const update = async (params) => {
  const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);
  const filterOption = {};
  if (isNumeric(params.id)) {
    filterOption.where = { id: +params.id };
  } else {
    filterOption.where = { slug: params.id };
  }

  const quiz = await quizzes.findOne(filterOption);

  if (!quiz) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await quiz.update(params.data);

  return quiz;
};

const destroy = async (params) => {
  const { id, userId } = params;

  const quiz = await quizzes.findOne({
    where: {
      id: +id,
      userId: userId,
    },
  });

  if (!quiz) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await quiz.destroy();

  return quiz;
};

module.exports = { findAll, findOne, create, update, destroy };
