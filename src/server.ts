import { Request, Response, ErrorRequestHandler } from 'express';

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mustache from 'mustache-express';

//import de rotas
import apiRouter from './routers/apiRouter';
import pageRender from './routers/pageRender';
import passport from 'passport';

dotenv.config();
const server = express();

server.use(express.static(path.join(__dirname, '../public'))); //arquivos staticos
server.use(express.urlencoded({ extended: true })); //middleware
server.use(passport.initialize());// AUTH

server.set('view engine', 'mustache'); //engine de view
server.set('views', path.join(__dirname, 'views')); // caminho da onde o engine de view vai renderizar
server.engine('mustache', mustache()); //colocando o engine em uso

server.use(apiRouter);
server.use(pageRender);

server.use((req, res, next) => {
	res.status(404).send('Página não encontrada');
});



const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	if (err.status) {
		res.status(err.status);
	} else {
		res.status(400);
	}
	if (err.message) {
		res.json({ error: err.message });
	} else {
		res.json({ error: "Ocorreu algum erro." });
	}
};
server.use(errorHandler);

server.listen(process.env.PORT);
