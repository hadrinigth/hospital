import { Router } from 'express';
import * as apiUserController from '../controllers/apiUserController';

const router = Router();

router.get('/api/ping', apiUserController.ping);
router.post('/api/patient', apiUserController.createPatient); //criar paciente
router.post('/api/patient', apiUserController.updatePatient); //atualizar pacientes

export default router;
