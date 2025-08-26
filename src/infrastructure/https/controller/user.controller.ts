import UserRepository from '@/infrastructure/database/user.repository.js';
import makeGetAllUsers from '@/use-cases/user/getAll.js';
import { NextFunction, Request, Response } from 'express';

const repo = new UserRepository();

export const handleListUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllUsersCase = makeGetAllUsers(repo)
    const users = getAllUsersCase()

    res.status(200).json({ code: 200, message: "Listando usuarios com sucesso", data: users})
  } catch (err) {
    next(err);
  }
};

export const handleDeleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
}