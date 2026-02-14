import { Product, UUID } from "../../../domain/entities/index.js";
import type { ProductRepository } from "../../../domain/repositories/index.js";

export type FindProductByIdUseCase = (id: UUID) => Promise<Product | undefined>;

export const makeFindProductById = (
    ProductRepository: ProductRepository
) => {
    const findProductById: FindProductByIdUseCase = async (id) => {
        if (!id) {
            throw new Error("Product ID is required");
        }
        const product = await ProductRepository.findById(id);
        if (!product) {
           return undefined 
        }
        return product;
    };
    return findProductById;
};