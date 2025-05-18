import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import './database';

import express from 'express';

import teachersRoutes from './routes/teachersRoutes';
import studentsRoutes from './routes/studentsRoutes';
import tokenRoutes from './routes/tokenRoutes';
import gamesRoutes from './routes/gamesRoutes';
import questionsRoutes from './routes/questionsRoutes';
import choicesRoutes from './routes/choicesRoutes';
import studentAmswersRoutes from './routes/studentAmswersRoutes';
import rankingRoutes from './routes/RankingRoutes';

const app = express();
// extended: true -> permite objetos e arrays complexos no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Middleware para processar dados enviados via formulário (application/x-www-form-urlencoded)
app.use(express.json()); // Middleware para processar requisições com corpo JSON (application/json)
app.use(cors());

app.use('/teachers/', teachersRoutes);
app.use('/students/', studentsRoutes);
app.use('/tokens/', tokenRoutes);
app.use('/games/', gamesRoutes);
app.use('/questions/', questionsRoutes);
app.use('/choices/', choicesRoutes);
app.use('/answers/', studentAmswersRoutes);
app.use('/ranking/', rankingRoutes);

export default app;
