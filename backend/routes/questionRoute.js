const router = require("express").Router();
const questionController = require("../controllers/questionController");

router.get("/", questionController.findAll);
router.get("/:id", questionController.findOne);
router.post("/", questionController.create);
router.put("/:id", questionController.update);
router.delete("/:id",questionController.destroy)

module.exports = router;
