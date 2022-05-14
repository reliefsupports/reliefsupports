import express from 'express';
import * as requestsController from '../controllers/requests-controller';

const router = express.Router();

router.post('/', requestsController.create);

export default router;
