const router = require('express').Router();
const scoreController = require('../controllers/scoreController');
const { isUser, isTeacher } = require('../middlewares/auth');

router.use(isUser);
router.get('/', scoreController.findAll);
router.get('/:id', scoreController.findOne);
router.post('/', scoreController.create);
router.use(isTeacher);
router.delete('/:id', scoreController.destroy);

module.exports = router;
