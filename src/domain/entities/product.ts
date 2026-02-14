export type UUID = string;

export type Product = {
  id: UUID;
  name: string;
  price: number;
  hidden: boolean;
  categoryId: UUID | null;
  createdAt: Date;
  updatedAt: Date;
};

export namespace Product {
    export type CreateParams = {
        id: UUID;
        name: string;
        price: number;
        hidden?: boolean;
        categoryId?: UUID | null;
    };
    export const create = (params: CreateParams, now: Date = new Date()): Product => {
        validate(params)
        return {
            id: params.id,
            name: params.name,
            price: params.price,
            hidden: params.hidden ?? false,
            categoryId: params.categoryId ?? null,
            createdAt: now,
            updatedAt: now,
        };
    }

    export const update = (product: Product, params: Partial<Omit<CreateParams, 'id'>>, now: Date = new Date()): Product => {
        if (params.name !== undefined) {
            if (typeof params.name !== 'string' || params.name.length === 0 || params.name.length > 255) {
                throw new Error("Invalid product name");
            }
            product.name = params.name;
        }
        if (params.price !== undefined) {
            if (typeof params.price !== 'number' || params.price < 0) {
                throw new Error("Invalid product price");
            }
            product.price = params.price;
        }
        if (params.hidden !== undefined) {
            product.hidden = params.hidden;
        }
        if (params.categoryId !== undefined) {
            product.categoryId = params.categoryId;
        }
        product.updatedAt = now;
        return product;
    }

    export const validate = (params: CreateParams) => {
        if (!params.name ||
             typeof params.name !== 'string' || 
             params.name.length === 0 || 
             params.name.length > 255
        ) {
            throw new Error("Invalid product name");
        }
        if (typeof params.price !== 'number' || params.price < 0) {
            throw new Error("Invalid product price");
        }
    }
}