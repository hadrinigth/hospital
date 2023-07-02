import { Router } from 'express';
import * as apiUserController from '../controllers/apiUserController';

const router = Router();

router.get('/api/ping', apiUserController.ping);

export default router;
