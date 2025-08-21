import IProductRepository from "@/interfaces/product.interface.js";
import { CreateProductInput, Product } from "@/schema/product.schema.js";

export default function makeCreateProduct(repo: IProductRepository) {
    return function createProduct(productPayload: CreateProductInput): Product {
        const newProduct = repo.create(productPayload)
        return newProduct
    }
}