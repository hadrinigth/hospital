import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mustache from 'mustache-express';

//import de rotas
import apiRouter from './routers/apiRouter';
import pageRender from './routers/pageRender';

dotenv.config();
const server = express();

server.use(express.static(path.join(__dirname, '../public'))); //arquivos staticos
server.use(express.urlencoded({ extended: true })); //middleware

server.set('view engine', 'mustache'); //engine de view
server.set('views', path.join(__dirname, 'views')); // caminho da onde o engine de view vai renderizar
server.engine('mustache', mustache()); //colocando o engine em uso

server.use(apiRouter);
server.use(pageRender);

server.use((req, res, next) => {
	res.status(404).send('Página não encontrada');
});

server.listen(process.env.PORT);
