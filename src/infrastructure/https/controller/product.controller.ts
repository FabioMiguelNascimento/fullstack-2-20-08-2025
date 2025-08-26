import ProductRepository from '@/infrastructure/database/product.repository.js';
import { CreateProductInput, UpdateProductInput } from '@/schema/product.schema.js';
import makeCreateProduct from '@/use-cases/product/create.js';
import makeDeleteProduct from '@/use-cases/product/delete.js';
import makeFindAllProducts from '@/use-cases/product/findAll.js';
import makeFindProductById from '@/use-cases/product/findById.js';
import makeUpdateProduct from '@/use-cases/product/update.js';
import { NextFunction, Request, Response } from 'express';

const repo = new ProductRepository();

export const handleCreateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productPayload: CreateProductInput = req.validatedData
    const userId = req.userId

    const createProductCase = makeCreateProduct(repo)
    const createdProduct = createProductCase(productPayload, userId)
    
    res.status(201).json({ code: 201, message: "Produto criado com sucesso", data: createdProduct })
  } catch (error) {
    next(error);
  }
};

export const handleFindAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const findAllProductsCase = makeFindAllProducts(repo)
    const products = findAllProductsCase()

    res.status(200).json({ code: 200, message: "Listando produtos com sucesso", data: products })
  } catch (error) {
    next(error);
  }
}

export const handleFindProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const { id } = req.validatedData as { id: number };

  const findProductByIdCase = makeFindProductById(repo)
  const product = findProductByIdCase(id)

    res.status(200).json({ code: 200, message: "Produto encontrado com sucesso", data: product})
  } catch (err) {
    next(err)
  }
}

export const handleUpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, ...updatePayload } = req.validatedData as { id: number } & UpdateProductInput;

    const updateProductCase = makeUpdateProduct(repo)
    const updatedProduct = updateProductCase(id, updatePayload)
      
    res.status(201).json({ code: 201, message: "Produto atualizado com sucesso", data: updatedProduct})
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.validatedData as { id: number };

    const deleteProductCase = makeDeleteProduct(repo)
    deleteProductCase(id)

    res.status(204).send()
  } catch (error) {
    next(error);
  }
};