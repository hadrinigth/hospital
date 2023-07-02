import { Request, Response } from 'express';

export const home = (req: Request, res: Response) => {
	res.render('pages/home');
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
