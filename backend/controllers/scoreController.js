const scoreService = require("../services/scoreService");

const findAll = async (req, res, next) => {
  try {
    const params = { userId: req.loggedUser.id };
    const scores = await scoreService.findAll(params);

    res.status(200).json({ message: "Get all scores", scores });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
      userId: req.loggedUser.id,
    };
    const score = await scoreService.findOne(params);

    res.status(200).json({ message: "Get score by id", score });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = {
      userId: req.loggedUser.id,
      quizId: req.body.quizId,
      score: req.body.score,
    };

    const score = await scoreService.create(data);

    res.status(201).json({ message: "Successfully created", score });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const params = {
      userId: req.loggedUser.id,
      id: req.params.id,
    };

    const quiz = await scoreService.destroy(params);

    res.status(200).json({ message: "Deleted", quiz });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { findAll, findOne, create, destroy };
