import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requirePermission } from '@/middlewares/permissionMiddleware.js';
import { validateBody, validateParams } from '@/middlewares/validateRequestMiddleware.js';
import { updateUserSchema, userIdSchema } from '@/schema/user.schema.js';
import express from 'express';
import { handleDeleteUser, handleListUsers, handleUpdateUser } from '../controller/user.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', handleListUsers)

router.patch('/:id', validateParams(userIdSchema), validateBody(updateUserSchema), handleUpdateUser);

router.use(requirePermission(['ADMIN', 'MANAGER']))

router.delete('/:id', validateParams(userIdSchema), handleDeleteUser);

export default router;