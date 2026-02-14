import type { UUID } from "../../../domain/entities/index.js";
import type { ProductRepository } from "../../../domain/repositories/index.js";

export type DeleteProductUseCase = (id: UUID) => Promise<void>;

export const makeDeleteProduct = ({
    productRepository,
}: {
    productRepository: ProductRepository;
}) => {
    const deleteProduct = async (id: UUID): Promise<void> => {
        if (!id) {
            throw new Error("Product ID is required");
        }
        const product = await productRepository.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return await productRepository.deleteById(id);
    };
    return deleteProduct;
};