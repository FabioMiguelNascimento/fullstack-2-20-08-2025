import UserRepository from '@/infrastructure/database/user.repository.js';
import { NextFunction, Request, Response } from 'express';

const userRepository = new UserRepository();

export const handleListUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
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