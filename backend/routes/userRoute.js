const router = require('express').Router();
const userController = require('../controllers/userController');
const { authentication, isUser } = require('../middlewares/auth');

router.use(authentication, isUser);
router.get('/', userController.findOne);
router.put('/', userController.update);

module.exports = router;
