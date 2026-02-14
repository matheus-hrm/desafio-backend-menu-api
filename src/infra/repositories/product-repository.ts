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
        await this.dbQuery(
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
        const rows = await this.dbQuery(
            `SELECT 
                id,
                name,
                price,
                category_id as categoryId,
                hidden, 
                created_at as createdAt, 
                updated_at as updatedAt
            FROM products WHERE id = ?`,
            [id]
        );
        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }
        const row: any = rows[0];
        return {
            id: row.id,
            name: row.name,
            price: Number(row.price),
            categoryId: row.categoryId,
            hidden: Boolean(row.hidden),
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt),
        };
    }
    async findAll(filters?: { includeHidden?: boolean }): Promise<Product[]> {
        const baseQuery = `SELECT id, name, price, category_id as categoryId, hidden, created_at as createdAt, updated_at as updatedAt
            FROM products`;
        const params: (string | number | boolean)[] = [];
        let query: string;
        if (filters?.includeHidden === true) {
            query = baseQuery;
        } else {
            query = `${baseQuery} WHERE hidden = ?`;
            params.push(false);
        }
        const rows = await this.dbQuery(query, params);
        if (!Array.isArray(rows)) {
            return [];
        }
        return rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            price: Number(row.price),
            categoryId: row.categoryId,
            hidden: Boolean(row.hidden),
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt),
        }));
    }
    async update(input: {
        id: string;
        name?: string;
        price?: number;
        hidden?: boolean;
        categoryId?: string | null;
    }): Promise<Product> {
        const fields: string[] = [];
        const params: (string | number | boolean)[] = [];
        if (input.name !== undefined) {
            fields.push("name = ?");
            params.push(input.name);
        }
        if (input.price !== undefined) {
            fields.push("price = ?");
            params.push(input.price);
        }
        if (input.hidden !== undefined) {
            fields.push("hidden = ?");
            params.push(input.hidden);
        }
        if (input.categoryId !== undefined && input.categoryId !== null) {
            fields.push("category_id = ?");
            params.push(input.categoryId);
        }
        if (fields.length === 0) {
            throw new Error("No fields to update");
        } 
        params.push(input.id);
        const query = `UPDATE products SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`;
        await this.dbQuery(query, params);
        return this.findById(input.id) as Promise<Product>;
    }
    async deleteById(id: string): Promise<void | undefined> {
        await this.dbQuery(
            `DELETE FROM products WHERE id = ?`,
            [id]
        );
    }
}   