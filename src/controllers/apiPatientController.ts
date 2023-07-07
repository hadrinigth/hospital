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
	const { numSus } = req.params;
	const updatePatientData = req.body;

	try {
		const updatePatient = await patientModel.findOneAndUpdate(
			{ numSus }, // Usando o campo numSus como identificador
			updatePatientData,
			{ runValidators: true, new: true }
		);

		if (!updatePatient) {
			return res.status(404).json({ error: 'Paciente não encontrado' });
		}

		return res.json({ patient: updatePatient });
	} catch (err) {
		console.log('Erro ao encontrar pacientes', err);
		res.status(500).json({ error: 'Erro interno' });
	}
};

export const removePatient = async (req: Request, res: Response) => {
	const { numSus } = req.params;

	try {
		const removedPatient = await patientModel.findOneAndRemove({ numSus }); // Usando o campo numSus como identificador

		if (!removedPatient) {
			return res.status(404).json({ error: 'Paciente não encontrado' });
		}

		return res.json({
			success: true,
			message: 'Paciente removido com sucesso',
		});
	} catch (err) {
		console.log('Erro ao remover paciente', err);
		res.status(500).json({ error: 'Erro interno' });
	}
};
