import { NotFoundError } from "@/infrastructure/https/error/HttpErrors.js";
import IProductRepository from "@/interfaces/product.interface.js";
import { CreateProductInput, Product } from "@/schema/product.schema.js";

export default function makeFindProductById(repo: IProductRepository) {
    return function findById(id: number): Product {
        const product = repo.findById(id)

        if(!product) {
            throw new NotFoundError("Produto nao encontrado")
        }

        return product
    }
}