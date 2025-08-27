import { CreateProductInput, ListproductInput, Product, UpdateProductInput } from "@/schema/product.schema.js";

export default interface IProductRepository {
    create(product: CreateProductInput, userId: string): Product;
    findAll(listInput: ListproductInput): Product[];
    findById(id: number): Product | undefined;
    update(id: number, userId: string, data: UpdateProductInput): Product;
    delete(id: number): void;
}
