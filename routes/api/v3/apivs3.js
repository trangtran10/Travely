import express from 'express';
var router = express.Router();

import postsRouter from './controllers/posts.js';
import urlsRouter from './controllers/urls.js';
import userRouter from './controllers/users.js';
import commentRouter from './controllers/comments.js';
import userInfoRouter from './controllers/userInfo.js';


router.use('/userInfo', userInfoRouter);
router.use('/posts', postsRouter);
router.use('/urls', urlsRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);

export default router;