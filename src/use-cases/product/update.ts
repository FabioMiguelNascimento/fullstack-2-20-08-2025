import { NotFoundError } from "@/infrastructure/https/error/HttpErrors.js";
import IProductRepository from "@/interfaces/product.interface.js";
import { Product, UpdateProductInput } from "@/schema/product.schema.js";

export default function makeUpdateProduct(repo: IProductRepository) {
    return function updateProduct(id: number, userId: string,  productPayload: UpdateProductInput): Product {
        const product = repo.findById(id)

        if(!product) {
            throw new NotFoundError("Produto nao encontrado")
        }

        const updatedProduct = repo.update(id, userId, productPayload)

        return updatedProduct
    }
}