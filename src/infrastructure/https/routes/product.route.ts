import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { requirePermission } from "@/middlewares/permissionMiddleware.js";
import { validateBody, validateParams } from "@/middlewares/validateRequestMiddleware.js";
import { createProductSchema, productIdSchema, updateProductSchema } from "@/schema/product.schema.js";
import express from 'express';
import { handleCreateProduct, handleDeleteProduct, handleFindAllProducts, handleFindProduct, handleUpdateProduct } from "../controller/product.controller.js";


const router = express.Router();

router.get('/',handleFindAllProducts);

router.get('/:id', validateParams(productIdSchema), handleFindProduct);

// router.use(authMiddleware, requirePermission(['ADMIN', 'MANAGER', 'SELLER']));

router.post('/',validateBody(createProductSchema),handleCreateProduct);

router.patch( '/:id', validateParams(productIdSchema), validateBody(updateProductSchema), handleUpdateProduct);

router.delete('/:id', validateParams(productIdSchema), handleDeleteProduct);

export default router;
