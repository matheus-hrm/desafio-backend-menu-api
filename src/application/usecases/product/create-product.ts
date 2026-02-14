import { Product } from "../../../domain/entities/index.js"
import type { CreateProductDTO }  from "../../dtos/product-dto.js"
import type { ProductRepository } from "../../../domain/repositories/index.js"
import type { IdGenerator } from "../../ports/id-generator.js"

export type CreateProductUseCase = (input: CreateProductDTO) => Promise<Product>;

export const makeCreateProduct = ({
    ProductRepository,
    IdGenerator
}: {
    ProductRepository: ProductRepository;
    IdGenerator: IdGenerator;
}): CreateProductUseCase => {
    return async (input) => {
        const product = Product.create({
            id: IdGenerator.generate(),
            ...input,
        });
        const createdProduct = await ProductRepository.create(product);
        return createdProduct;
    }
}