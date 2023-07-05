import { Request, Response } from 'express';
import patientModel from '../models/patientModel';

export const ping = async (req: Request, res: Response) => {
	res.json({ pong: true }); // teste
};

export const createPatient = async (req: Request, res: Response) => {
	try {
		let { name, dateBirth, numSus } = req.body; //pego os dados iniciais para cria o patient
		let newPatient = new patientModel({
			//preencho o model comas infos
			infos: {
				name,
				dateBirth,
				numSus,
				entry: new Date(),
			},
			//sera preenchida ainda
			symptoms: {
				diabetes: false,
				allergies: [],
			},
			diagnosis: {
				dengue: false,
				covid: false,
				lombriga: false,
			},
			uti: false,
		});
		await newPatient.save();
		res.json({ success: true, patient: newPatient });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: 'Erro ao cadastrar paciente',
		});
	}
};

export const updatePatient = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updatePatientData = req.body;

	try {
		const updatePatient = await patientModel.findByIdAndUpdate(
			id,
			updatePatientData,
			{
				runValidators: true,
				new: true,
			}
		);

		if (!updatePatient) {
			return res.status(404).json({ error: 'Paciente Não encontrado' });
		}
		return res.json({ updatePatient });
	} catch (err) {
		console.log('erro ao encontra pacientes', err);
		res.status(500).json({ error: 'Error Interno' });
	}
};
