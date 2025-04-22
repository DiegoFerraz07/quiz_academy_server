import dotenv from 'dotenv';

dotenv.config();

import express from 'express';

const app = express();
// extended: true -> permite objetos e arrays complexos no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Middleware para processar dados enviados via formulário (application/x-www-form-urlencoded)
app.use(express.json()); // Middleware para processar requisições com corpo JSON (application/json)

export default app;
