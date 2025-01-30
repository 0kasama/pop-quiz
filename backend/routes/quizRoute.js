const router = require('express').Router();
const quizController = require('../controllers/quizController');
const { isUser, isTeacher } = require('../middlewares/auth');

router.use(isUser);
router.get('/', quizController.findAll);
router.get('/:id', quizController.findOne);
router.use(isTeacher);
router.post('/', quizController.create);
router.put('/:id', quizController.update);
router.delete('/:id', quizController.destroy);

module.exports = router;
