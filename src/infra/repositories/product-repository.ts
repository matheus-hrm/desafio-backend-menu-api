import { Product } from '../../domain/entities/index.js';
import { makeDbQuery } from '../db/mysql.js'


type dbQuery = ReturnType<typeof makeDbQuery>;

type CreateProductData = {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    hidden: boolean;
}

export class ProductRepository {
    constructor(private readonly dbQuery: dbQuery) { }

    async create(productData: CreateProductData): Promise<Product> {
        const [result] = await this.dbQuery(
            `INSERT INTO products
            (id, name, price, category_id, hidden)
            VALUES (?, ?, ?, ?, ?)`,
            [
                productData.id,
                productData.name,
                productData.price,
                productData.categoryId,
                productData.hidden,
            ]
        );
        const createdAt = new Date();
        const updatedAt = createdAt;
        return {
            id: productData.id,
            name: productData.name,
            price: productData.price,
            categoryId: productData.categoryId,
            hidden: productData.hidden,
            createdAt,
            updatedAt,
        };
    }
    async findById(id: string): Promise<Product | null> {
        return null;
    }
    async findAll(filters?: { includeHidden?: boolean }): Promise<Product[]> {
        return [];
    }
    async update(input: {
        id: string;
        name?: string;
        price?: number;
        hidden?: boolean;
        categoryId?: string | null;
    }): Promise<Product> {
        return null as any;
    }
    async deleteById(id: string): Promise<void | undefined> {}
}   