const quizService = require("../services/quizService");

const findAll = async (req, res, next) => {
  try {
    const quizzes = await quizService.findAll();

    res.status(200).json({ message: "Get all quizzes", quizzes });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    const quiz = await quizService.findOne(params);

    res.status(200).json({ message: "Get quiz by id", quiz });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = {
      userId: req.loggedUser.id,
      title: req.body.title,
    };

    const quiz = await quizService.create(data);

    res.status(201).json({ message: "Successfully created", quiz });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


const update = async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
      data: req.body,
    };
    const quiz = await quizService.update(params);

    res.status(201).json({ message: "Update success", quiz });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const params = {
      userId: req.loggedUser.id,
      id: req.params.id,
    };

    const quiz = await quizService.destroy(params);

    res.status(200).json({ message: "Deleted", quiz });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

module.exports = { findAll, findOne, create, update, destroy };
