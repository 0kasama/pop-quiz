const router = require('express').Router();
const questionController = require('../controllers/questionController');
const { isUser, isTeacher } = require('../middlewares/auth');

router.use(isUser);
router.get('/', questionController.findAll);
router.get('/:id', questionController.findOne);
router.use(isTeacher);
router.post('/', questionController.create);
router.put('/:id', questionController.update);
router.delete('/:id', questionController.destroy);

module.exports = router;
