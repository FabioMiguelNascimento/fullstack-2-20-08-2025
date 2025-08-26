import { CreateProductInput, Product, UpdateProductInput } from "@/schema/product.schema.js";

export default interface IProductRepository {
    create(product: CreateProductInput, userId: string): Product;
    findAll(): Product[];
    findById(id: number): Product | undefined;
    update(id: number, data: UpdateProductInput): Product;
    delete(id: number): void;
}
