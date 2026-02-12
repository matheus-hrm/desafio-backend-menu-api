import { config } from 'dotenv'

config()

export const databaseConfig = {
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? '3306',
    database: process.env.DB_NAME ?? ''
} as const