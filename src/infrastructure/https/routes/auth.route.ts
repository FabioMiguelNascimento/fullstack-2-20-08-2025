import { validateBody } from '@/middlewares/validateRequestMiddleware.js';
import { loginSchema, registerSchema } from '@/schema/auth.schema.js';
import express from 'express';
import { handleLoginUser, handleRegisterUser } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), handleRegisterUser);
router.post('/login', validateBody(loginSchema), handleLoginUser);

export default router;
