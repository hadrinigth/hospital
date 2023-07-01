import { Router } from 'express';
import * as homeController from '../controllers/homeController';
import * as loginController from '../controllers/loginController';
import * as registerController from '../controllers/registerController';
import * as profileController from '../controllers/profileController';

const router = Router();

router.get('/', homeController.home);
router.get('/login', loginController.login);
router.get('/register', registerController.register);
router.get('/profile', profileController.profile);

export default router;
