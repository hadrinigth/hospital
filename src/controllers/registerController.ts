import { Request, Response } from 'express';

export const register = (req: Request, res: Response) => {
	res.render('pages/register');
};
