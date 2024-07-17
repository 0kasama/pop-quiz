const router = require("express").Router();
const quizController = require("../controllers/quizController");

router.get("/", quizController.findAll);
router.get("/:id", quizController.findOne);
router.post("/", quizController.create);
router.put("/:id", quizController.update);
router.delete("/:id",quizController.destroy)

module.exports = router;
