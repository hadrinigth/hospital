import { Router } from 'express';
import * as apiUserController from '../controllers/api/apiPatientController';
import * as apiAtendantController from '../controllers/api/apiAtendantController'
import { privateRoute } from '../config/passport';

const router = Router();

router.get('/api/patient/ping', apiUserController.ping);
router.post('/api/patient', apiUserController.createPatient); //criar paciente
router.put('/api/patient/:numSus', apiUserController.updatePatient); //atualizar pacientes //TODO  Func funcionado corretamento mais nao sei como emblementa no site ainda
router.delete('/api/patient/:numSus', apiUserController.removePatient);

//   api
//      do
//        atendant

router.get('/api/attendent', privateRoute, apiAtendantController.ping);
router.post('/api/attendent', apiAtendantController.createAttendent);
router.put('/api/attendent/:email', apiAtendantController.updateAttendent );
router.delete('/api/attendent', apiUserController.removePatient);




export default router;
