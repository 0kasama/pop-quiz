const router = require('express').Router();
const answerController = require('../controllers/answerController');
const { isUser, isTeacher } = require('../middlewares/auth');

router.use(isUser);
router.get('/', answerController.findAll);
router.get('/:id', answerController.findOne);
router.use(isTeacher);
router.post('/', answerController.create);
router.put('/:id', answerController.update);
router.delete('/:id', answerController.destroy);

module.exports = router;
