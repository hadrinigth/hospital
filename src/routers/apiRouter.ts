import { Router } from 'express';
import * as apiUserController from '../controllers/apiPatientController';

const router = Router();

router.get('/api/ping', apiUserController.ping);
router.post('/api/patient', apiUserController.createPatient); //criar paciente
router.put('/api/patientUp/:numSus', apiUserController.updatePatient); //atualizar pacientes //TODO  Func funcionado corretamento mais nao sei como emblementa no site ainda
router.delete('/api/patientRe/:numSus', apiUserController.removePatient);
export default router;
