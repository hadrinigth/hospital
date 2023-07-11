import { Router } from 'express';
import * as pageRenderController from '../controllers/viewController/pageRenderController';

const router = Router();

router.get('/', pageRenderController.home);
router.get('/registerPat', pageRenderController.register);
router.get('/profile', pageRenderController.profile);
router.get('/login', pageRenderController.login);

export default router;
