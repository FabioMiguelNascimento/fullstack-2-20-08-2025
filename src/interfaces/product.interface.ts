import { CreateProductInput, Product, UpdateProductInput } from "@/schema/product.schema.js";

export default interface IProductRepository {
    create(product: CreateProductInput): Product;
    findAll(): Product[];
    findById(id: string): Product | null;
    update(id: string, data: UpdateProductInput): Product | null;
    delete(id: string): void;
}
