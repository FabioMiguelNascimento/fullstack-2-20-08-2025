import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { errorHandler, requestNotFound } from './infrastructure/https/error/ErrorHandler.js';
import authRoute from './infrastructure/https/routes/auth.route.js';
import pingRoute from './infrastructure/https/routes/ping.route.js';
import productRoute from './infrastructure/https/routes/product.route.js';
import userRoute from './infrastructure/https/routes/user.route.js';

const app = express();
const PORT = process.env.PORT ;

const server = http.createServer(app);

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002', 'http://127.0.0.1:3000', 'http://127.0.0.1:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/api/ping', pingRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute)


app.use(errorHandler);
app.use(requestNotFound);

server.listen(Number(PORT), () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

