const router = require("express").Router();
const scoreController = require("../controllers/scoreController");

router.get("/", scoreController.findAll);
router.get("/:id", scoreController.findOne);
router.post("/", scoreController.create);
router.delete("/:id", scoreController.destroy);

module.exports = router;
