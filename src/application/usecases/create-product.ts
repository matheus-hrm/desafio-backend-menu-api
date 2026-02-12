import type { Product } from "../../domain/entities/index.js"
import type { CreateProductDTO, CreateProductDTO as ProductDTO }  from "../dtos/product-dto.js"
import type { ProductRepository } from "../../domain/repositories/index.js"
import type { IdGenerator } from "../ports/id-generator.js"

export type CreateProductUseCase = (input: CreateProductDTO) => Promise<Product>;

export const makecreateProduct = ({
    ProductRepository,
    IdGenerator
}: {
    ProductRepository: ProductRepository;
    IdGenerator: IdGenerator;
}): CreateProductUseCase => {
    return async (input) => {
        return ProductRepository.create({
            id: IdGenerator.generate(),
            ...input,
            hidden: input.hidden ?? false,
        }); 
    }
}