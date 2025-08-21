import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { errorHandler, requestNotFound } from './infrastructure/https/error/ErrorHandler.js';
import pingRoute from './infrastructure/https/routes/ping.route.js';
import authRoute from './infrastructure/https/routes/auth.route.js';

const app = express();
const PORT = process.env.PORT ;

const server = http.createServer(app);

app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/api/ping', pingRoute);
app.use('/api/auth', authRoute);
// app.use('/api/product', productRoute);


app.use(errorHandler);
app.use(requestNotFound);

server.listen(Number(PORT), () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

