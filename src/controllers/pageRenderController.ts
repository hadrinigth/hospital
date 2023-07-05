import { Request, Response } from 'express';
import patientModel from '../models/patientModel';

export const home = async (req: Request, res: Response) => {
	try {
		const patients = await patientModel.find({});
		res.render('pages/home', { patients });
		console.log(patients);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const login = (req: Request, res: Response) => {
	res.render('pages/login');
};

export const profile = (req: Request, res: Response) => {
	res.render('pages/profile');
};

export const register = (req: Request, res: Response) => {
	res.render('pages/register');
};
