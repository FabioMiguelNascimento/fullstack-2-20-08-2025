import UserRepository from '@/infrastructure/database/user.repository.js';
import { LoginSchemaType } from '@/schema/auth.schema.js';
import makeLoginUser from '@/use-cases/auth/login.js';
import makeRegisterUser from '@/use-cases/auth/register.js';
import { NextFunction, Request, Response } from 'express';

const repo = new UserRepository();

export const handleLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginPayload: LoginSchemaType = req.validatedData

        const loginUserCase = makeLoginUser(repo)
        const loggedinUser = loginUserCase(loginPayload)
        
        res.status(200).json({ code: 200, message: "Login efeituado com sucesso", data: loggedinUser})
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

export const handleGetMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.userId);
        
        const user = repo.findUserById(userId);
        
        if (!user) {
            return res.status(404).json({ code: 404, message: "Usuario nao encontrado" });
        }

        const { password, ...userWithoutPassword } = user;
        
        res.status(200).json({ 
            code: 200, 
            message: "Dados do usuario obtidos com sucesso", 
            data: userWithoutPassword 
        });
    } catch (err) {
        next(err);
    }
}