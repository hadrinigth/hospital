import { Router } from 'express';
import * as pageRenderController from '../controllers/viewController/pageRenderController';

const router = Router();

router.get('/', pageRenderController.home);
router.get('/register', pageRenderController.register);
router.get('/profile', pageRenderController.profile);
router.get('/login', pageRenderController.login);

export default router;
