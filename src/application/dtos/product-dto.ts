

export type CreateProductDTO = {
    name: string; 
    description?: string;
    price: number;
    categoryId: string;
    hidden?: boolean;
}

export type GetProcutDTO = {
    id: string;
    name: string;
    description?: string;
    priceInCents: number;
    categoryId: string;
    hidden: boolean;
    createdAt: Date;
    updatedAt: Date;
}