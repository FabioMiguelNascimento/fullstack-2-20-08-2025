import ProductRepository from '@/infrastructure/database/product.repository.js';
import { CreateProductInput } from '@/schema/product.schema.js';
import makeCreateProduct from '@/use-cases/product/create.js';
import makeFindAllProducts from '@/use-cases/product/findAll.js';
import { NextFunction, Request, Response } from 'express';

const repo = new ProductRepository();

export const handleCreateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productPayload: CreateProductInput = req.validatedData

    const createProductCase = makeCreateProduct(repo)
    const createdProduct = createProductCase(productPayload)

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
  } catch (err) {
    next(err)
  }
}

export const handleUpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const handleAddProductImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProductImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const handleGetImageUrls = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};
