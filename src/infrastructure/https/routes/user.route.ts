import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requirePermission } from '@/middlewares/permissionMiddleware.js';
import { validateBody, validateParams } from '@/middlewares/validateRequestMiddleware.js';
import { createUserSchema, userIdSchema } from '@/schema/user.schema.js';
import express from 'express';
import { handleDeleteUser, handleListUsers } from '../controller/user.controller.js';

const router = express.Router();

router.use(authMiddleware);

// router.use(requirePermission(['ADMIN', 'MANAGER']))

router.get('/', handleListUsers)

router.delete('/:id', validateParams(userIdSchema), handleDeleteUser);

export default router;