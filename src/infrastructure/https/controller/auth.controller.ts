import UserRepository from '@/infrastructure/database/user.repository.js';
import makeRegisterUser from '@/use-cases/auth/register.js';
import { NextFunction, Request, Response } from 'express';

const repo = new UserRepository();

export const handleLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (err) {
        next(err)
    }
}

export const handleRegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const registerPayload = req.validatedData

        const registerUserCase = makeRegisterUser(repo)
        const registeredUser = registerUserCase(registerPayload)

        res.status(201).json({ code: 201, message: "Usuario registrado com sucesso", data: registeredUser})
    } catch (err) {
        next(err);
    }
}