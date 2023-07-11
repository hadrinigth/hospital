import { Request, Response } from 'express';
import Attendent from '../../models/attendentModel';
import { generateToken } from '../../config/passport';

export const ping = async (req: Request, res: Response) => {
	res.json({ pong: true }); // teste
};



//  Criando attendent
export const createAttendent = async (req: Request, res: Response) => {
	try {
		let { name, email, password} = req.body; //pego os dados iniciais para cria o Attendent
		let newAttendent = new Attendent ({
			//preencho o model comas infos
            infos: {
                name,
                email,
                password
            }

    });
		await newAttendent.save();

		const token = generateToken({ id: newAttendent._id });// token JWT

		res.json({ success: true, Attendent: newAttendent, token});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: 'Erro ao cadastrar Atendente',
		});
	}
};
// login

export const loginAttendent = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const attendentVerify = await Attendent.findOne({ 'infos.email': email });

		if (!attendentVerify) {
			return res.status(401).json({
				success: false,
				error: 'Usuário não existe',
			});
		}

		if (attendentVerify.infos.password !== password) {
			return res.status(401).json({
				success: false,
				error: 'Senha incorreta',
			});
		}

		// Gerar token de autenticação
		const token = generateToken({ id: attendentVerify._id });

		return res.json({ success: true, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: 'Erro ao realizar o login do atendente',
		});
	}
};








export const updateAttendent = async (req: Request, res: Response) => {
	const { email } = req.params; // TODO PROVISORIO
	const updateAttendentData = req.body;

	try {
		const updateAttendent = await Attendent.findOneAndUpdate(
			{ email }, // Usando o campo numSus como identificador
			updateAttendentData,
			{ runValidators: true, new: true }
		);

		if (!updateAttendent) {
			return res.status(404).json({ error: 'Atendente não encontrado' });
		}

		return res.json({ Attendent: updateAttendent });
	} catch (err) {
		console.log('Erro ao encontrar Atendentes', err);
		res.status(500).json({ error: 'Erro interno' });
	}
};








export const removeAttendent = async (req: Request, res: Response) => {
	const { email } = req.params;// TODO PROVISORIO

	try {
		const removedAttendent = await Attendent.findOneAndRemove({ email }); // Usando o campo numSus como identificador

		if (!removedAttendent) {
			return res.status(404).json({ error: 'Atendente não encontrado' });
		}

		return res.json({
			success: true,
			message: 'Atendente removido com sucesso',
		});
	} catch (err) {
		console.log('Erro ao remover Atendente', err);
		res.status(500).json({ error: 'Erro interno' });
	}
};
