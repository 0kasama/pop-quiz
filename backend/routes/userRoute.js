const router = require("express").Router();
const userController = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares/auth");

router.use(authentication, authorization);
router.get("/", userController.findOne);
router.put("/", userController.update);

module.exports = router;
