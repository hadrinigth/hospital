import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mustache from 'mustache-express';
import mainRouter from './routers/index';
dotenv.config();
const server = express();

server.use(express.static(path.join(__dirname, '../public'))); //arquivos staticos
server.use(express.urlencoded({ extended: true })); //middleware

server.set('view engine', 'mustache'); //engine de view
server.set('views', path.join(__dirname, 'views')); // caminho da onde o engine de view vai renderizar
server.engine('mustache', mustache()); //colocando o engine em uso

server.use(mainRouter);
server.listen(process.env.PORT);
