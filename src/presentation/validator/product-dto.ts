import { CreateProductDTO } from "../../application/dtos/product-dto.js";

export type ValidateStrategy = "create" | "update";
export type UpdateProductDTO = Partial<CreateProductDTO>;

const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null;
};

const isNonEmptyString = (value: unknown): value is string => {
    return typeof value === "string" && value.trim().length > 0;
};

const isValidPrice = (value: unknown): value is number => {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
};

const createValidator = (product: Record<string, unknown>): product is CreateProductDTO => {
    return (
        isNonEmptyString(product.name) &&
        isValidPrice(product.price) &&
        (product.hidden === undefined || typeof product.hidden === "boolean") &&
        isNonEmptyString(product.categoryId)
    );
};

const updateValidator = (product: Record<string, unknown>): product is UpdateProductDTO => {
    return (
        (product.name === undefined || isNonEmptyString(product.name)) &&
        (product.description === undefined || typeof product.description === "string") &&
        (product.price === undefined || isValidPrice(product.price)) &&
        (product.hidden === undefined || typeof product.hidden === "boolean") &&
        (product.categoryId === undefined || isNonEmptyString(product.categoryId))
    );
};

const strategyValidators: {
    create: (product: Record<string, unknown>) => product is CreateProductDTO;
    update: (product: Record<string, unknown>) => product is UpdateProductDTO;
} = {
    create: createValidator,
    update: updateValidator,
};

export function validateProduct(product: unknown, strategy?: "create"): product is CreateProductDTO;
export function validateProduct(product: unknown, strategy: "update"): product is UpdateProductDTO;
export function validateProduct(
    product: unknown,
    strategy: ValidateStrategy = "create"
): product is CreateProductDTO | UpdateProductDTO {
    if (!isObject(product)) {
        return false;
    }

    return strategyValidators[strategy](product);
}
