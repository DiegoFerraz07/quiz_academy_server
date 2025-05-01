import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import './database';

import express from 'express';

import teachersRoutes from './routes/teachersRoutes';
import studentsRoutes from './routes/studentsRoutes';
import tokenRoutes from './routes/tokenRoutes';

const app = express();
// extended: true -> permite objetos e arrays complexos no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Middleware para processar dados enviados via formulário (application/x-www-form-urlencoded)
app.use(express.json()); // Middleware para processar requisições com corpo JSON (application/json)
app.use(cors());

app.use('/teachers/', teachersRoutes);
app.use('/students/', studentsRoutes);
app.use('/tokens/', tokenRoutes);

export default app;
