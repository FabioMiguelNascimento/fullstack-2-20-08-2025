import ProductRepository from '@/infrastructure/database/product.repository.js';
import { NextFunction, Request, Response } from 'express';

const productRepository = new ProductRepository();

export const handleCreateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const handleFindAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
