import UserRepository from '@/infrastructure/database/user.repository.js';
import { NextFunction, Request, Response } from 'express';

const userRepository = new UserRepository();

export const handleLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (err) {
        next(err)
    }
}

export const handleRegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err) {
        next(err);
    }
}