import { authMiddleware } from '@/middlewares/authMiddleware.js';
import { requirePermission } from '@/middlewares/permissionMiddleware.js';
import { validateBody, validateParams } from '@/middlewares/validateRequestMiddleware.js';
import { createUserSchema, userIdSchema } from '@/schema/user.schema.js';
import express from 'express';
import { handleCreateUser, handleDeleteUser, handleListUsers } from '../controller/user.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', requirePermission(['ADMIN', 'MANAGER']), validateBody(createUserSchema), handleCreateUser)

router.get('/', requirePermission(['ADMIN', 'MANAGER']), handleListUsers)

router.delete('/:id', requirePermission(['ADMIN', 'MANAGER']), validateParams(userIdSchema), handleDeleteUser);

export default router;