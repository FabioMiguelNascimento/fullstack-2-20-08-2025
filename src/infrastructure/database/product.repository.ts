import db from "@/database/db.js";
import IProductRepository from "@/interfaces/product.interface.js";
import { CreateProductInput, ListproductInput, Product, UpdateProductInput } from "@/schema/product.schema.js";

export default class ProductRepository implements IProductRepository {
    create(product: CreateProductInput, userId: string): Product {
        const newProduct: Product = {
            ...product,
            id: db.products.length + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: userId
        };
        db.products.push(newProduct);
        return newProduct;
    }

    findAll(listInput: ListproductInput): Product[] {
        const filterKeys = Object.keys(listInput);

            if (filterKeys.length === 0) {
                return db.products;
            }

            return db.products.filter(product => {
                return filterKeys.every(key => {
                    const filterValue = listInput[key];
                    const productValue = product[key];

                    if (filterValue === undefined) {
                        return true;
                    }

                    if (filterKeys.includes(key)) {
                        return productValue.toLowerCase().includes((filterValue).toLowerCase());
                    } else {
                        return productValue === filterValue;
                    }
                });
            });
        }


    findById(id: number): Product | undefined {
        const product = db.products.find(p => p.id == id)

        return product
    }

    delete(id: number): void {
        const index = db.products.findIndex(x => x.id == id)

        db.products.splice(index, 1)
    }

    update(id: number, userId: string,  data: UpdateProductInput): Product {
        let product = this.findById(id)

        product = {...product, ...data, updatedAt: new Date(), updatedBy: userId} as Product

        const index = db.products.findIndex(x => x.id == id)

        db.products[index] = product

        return db.products[index]
    }
}