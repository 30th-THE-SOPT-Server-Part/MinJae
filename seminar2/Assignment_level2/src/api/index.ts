import express, { Router } from 'express';

const router: Router = express.Router();

const userRouter = require('./routers/user');
const blogRouter = require('./routers/blog');
const signUpRouter = require('./routers/signup');
const likeRouter = require('./routers/like');

router.use('/user', userRouter);
router.use('/blog', blogRouter);
router.use('/signup', signUpRouter);
router.use('/like', likeRouter);

module.exports = router;