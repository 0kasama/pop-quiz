const answerService = require("../services/answerService");

const findAll = async (req, res, next) => {
  try {
    const questionId = req.query.questionId;
    if (questionId) {
      const answers = await answerService.findAll(questionId);
      res
        .status(200)
        .json({ message: "Get all answers by question id", answers });
    } else {
      const answers = await answerService.findAll();
      res.status(200).json({ message: "Get all answers", answers });
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
    const answer = await answerService.findOne(params);

    res.status(200).json({ message: "Get answer by id", answer });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = {
      questionId: req.body.questionId,
      answer: req.body.answer,
      isCorrect: req.body.isCorrect,
    };

    const answer = await answerService.create(data);

    res.status(201).json({ message: "Successfully created", answer });
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
    const answer = await answerService.update(params);

    res.status(201).json({ message: "Update success", answer });
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

    const answer = await answerService.destroy(params);

    res.status(200).json({ message: "Deleted", answer });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { findAll, findOne, create, update, destroy };
