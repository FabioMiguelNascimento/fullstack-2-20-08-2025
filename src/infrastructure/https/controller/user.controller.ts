import UserRepository from '@/infrastructure/database/user.repository.js';
import makeDeleteUser from '@/use-cases/user/delete.js';
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
    const {id} = req.validatedData
    const currentId = req.userId
    const currentRole = req.userRole

    const deleteUserCase = makeDeleteUser(repo)
    deleteUserCase(id, currentId, currentRole)

    res.status(203).json({ code: 203, message: 'Usuario deletado com sucesso'})
  } catch (err) {
    next(err);
  }
}