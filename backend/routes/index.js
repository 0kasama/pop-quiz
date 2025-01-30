const router = require('express').Router();
const { authentication } = require('../middlewares/auth');

const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const quizRoute = require('./quizRoute');
const questionRoute = require('./questionRoute');
const answerRoute = require('./answerRoute');
const scoreRoute = require('./scoreRoute');

router.use('/api/auth', authRoute);
router.use(authentication);
router.use('/api/user', userRoute);
router.use('/api/quiz', quizRoute);
router.use('/api/question', questionRoute);
router.use('/api/answer', answerRoute);
router.use('/api/score', scoreRoute);

module.exports = router;
