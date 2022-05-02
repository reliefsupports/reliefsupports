import express from 'express';

import auth from 'middlewares/auth';
import * as entryHandler from 'handlers/entry';

const router = express.Router();

router.get('/entries', auth, entryHandler.get);
router.get('/entries/:id', auth, entryHandler.getSingle);
router.post('/entries', auth, entryHandler.post);
router.patch('/entries/:id', auth, entryHandler.patch);
router.delete('/entries/:id', auth, entryHandler.remove);

export default router;
