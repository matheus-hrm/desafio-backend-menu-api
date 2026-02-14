import { Product } from "../../../domain/entities/index.js";
import type { ProductRepository } from "../../../domain/repositories/index.js";

export type FindProductsUseCase = (input: void) => Promise<Product[]>;

export const makeFindProducts = ({
    ProductRepository,
}: {
    ProductRepository: ProductRepository;
}) => {
    return async () => {
        const products = await ProductRepository.findAll();
        return products;
    }
}