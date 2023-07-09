import { Router } from 'express';
import * as apiUserController from '../controllers/api/apiPatientController';
import * as apiAtendantController from '../controllers/api/apiAtendantController'

const router = Router();

router.get('/api/patient/ping', apiUserController.ping);
router.post('/api/patient', apiUserController.createPatient); //criar paciente
router.put('/api/patientUp/:numSus', apiUserController.updatePatient); //atualizar pacientes //TODO  Func funcionado corretamento mais nao sei como emblementa no site ainda
router.delete('/api/patientRe/:numSus', apiUserController.removePatient);

//   api
//      do
//        atendant

router.get('/api/attendent/ping', apiAtendantController.ping);
router.post('/api/attendent/new', apiAtendantController.createAttendent);
router.put('/api/attendent/edit/:email', apiAtendantController.updateAttendent );
router.delete('/api/attendent/remove', apiUserController.removePatient);




export default router;
