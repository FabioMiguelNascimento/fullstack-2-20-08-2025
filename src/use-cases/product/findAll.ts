import { NotFoundError } from "@/infrastructure/https/error/HttpErrors.js";
import IProductRepository from "@/interfaces/product.interface.js";
import { ListproductInput, Product } from "@/schema/product.schema.js";

export default function makeFindAllProducts(repo: IProductRepository) {
    return function findAll(listInput: ListproductInput): Product[] {
        const products = repo.findAll(listInput)

        if(!products || products.length === 0) {
            throw new NotFoundError("Nenhum produto encontrado");
        }

        return products
    }
}