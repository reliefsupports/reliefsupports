import express from 'express';

import * as authHandler from 'handlers/auth';

const router = express.Router();

router.post('/user', authHandler.post);
router.post('/user/login', authHandler.login);

export default router;
