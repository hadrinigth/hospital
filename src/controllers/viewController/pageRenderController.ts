import { Request, Response } from 'express';
import Patient from '../../models/patientModel';

export const home = async (req: Request, res: Response) => {
    try {
		const allPatients = await Patient.find({});
		console.log(allPatients);
		res.render("pages/home", {  allPatients });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
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
