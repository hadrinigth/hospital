import express from "express";
import dotenv from 'dotenv';

dotenv.config();
const server = express();

server.listen(process.env.PORT)