const router = require("express").Router();
const answerController = require("../controllers/answerController");

router.get("/", answerController.findAll);
router.get("/:id", answerController.findOne);
router.post("/", answerController.create);
router.put("/:id", answerController.update);
router.delete("/:id", answerController.destroy);

module.exports = router;
