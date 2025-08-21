import { NotFoundError } from "@/infrastructure/https/error/HttpErrors.js";
import IProductRepository from "@/interfaces/product.interface.js";

export default function makeDeleteProduct(repo: IProductRepository) {
    return function deleteProduct(id: number) {
        const product = repo.findById(id)

        if(!product) {
            throw new NotFoundError("Produto nao encontrado para deletar")
        }

        repo.delete(id)
    }
}