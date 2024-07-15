const questionService = require("../services/questionService");

const findAll = async (req, res, next) => {
  try {
    const quizId = req.query.quizId;
    if (quizId) {
      const questions = await questionService.findAll(quizId);
      res.status(200).json({ message: "Get all questions by quiz id", questions });
    } else {
      const questions = await questionService.findAll();
      res.status(200).json({ message: "Get all questions", questions });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    const question = await questionService.findOne(params);

    res.status(200).json({ message: "Get question by id", question });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = {
      quizId: req.body.quizId,
      question: req.body.question,
    };

    const question = await questionService.create(data);

    res.status(201).json({ message: "Successfully created", question });
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
    const question = await questionService.update(params);

    res.status(201).json({ message: "Update success", question });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };

    const question = await questionService.destroy(params);

    res.status(200).json({ message: "Deleted", question });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { findAll, findOne, create, update, destroy };
