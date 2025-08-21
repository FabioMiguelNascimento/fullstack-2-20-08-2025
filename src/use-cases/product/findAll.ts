import { NotFoundError } from "@/infrastructure/https/error/HttpErrors.js";
import IProductRepository from "@/interfaces/product.interface.js";
import { Product } from "@/schema/product.schema.js";

export default function makeFindAllProducts(repo: IProductRepository) {
    return function findAll(): Product[] {
        const products = repo.findAll()

        if(products.length === 0) {
            throw new NotFoundError("Nenhum produto encontrado");
        }

        return products
    }
}