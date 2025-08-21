import db from "@/database/db.js";
import IProductRepository from "@/interfaces/product.interface.js";
import { CreateProductInput, Product } from "@/schema/product.schema.js";

export default class ProductRepository implements IProductRepository {
    create(product: CreateProductInput): Product {
        const newProduct: Product = {
            id: db.products.length + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...product
        };
        db.products.push(newProduct);
        return newProduct;
    }

    findAll(): Product[] {
        const products = db.products

        return products
    }
}