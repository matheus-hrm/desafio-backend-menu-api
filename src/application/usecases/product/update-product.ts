import { UUID } from "../../../domain/entities/index.js";
import { ProductRepository } from "../../../domain/repositories/index.js";
import { CreateProductDTO } from "../../dtos/product-dto.js";

export type UpdateProductUseCase = (id: UUID, data: Partial<CreateProductDTO>) => Promise<void>;

export const makeUpdateProduct = ({
    productRepository,
}: {
    productRepository: ProductRepository;
}) => {
    const updateProduct = async (
        id: UUID, data: Partial<CreateProductDTO>
    ): Promise<void> => {
        if (!id) {
            throw new Error("Product ID is required");
        }
        const product = await productRepository.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        const updatedProduct = {
            ...product,
            ...data,
            updatedAt: new Date(),
        };
        await productRepository.update(updatedProduct);
    };
    return updateProduct;
}