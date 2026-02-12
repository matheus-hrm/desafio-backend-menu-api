import fastifyMysql from "@fastify/mysql";
import { FastifyInstance } from "fastify";
import { DbHealthChecker } from "../../application/ports/db-health-checker.js";

export type DbConfig = {
  user: string;
  password: string;
  host: string;
  port: string | number;
  database: string;
};

type connString<T extends DbConfig> = 
  `mysql://${T["user"]}:${T["password"]}@${T["host"]}:${T["port"]}/${T["database"]}`;

export type AppWithDb = FastifyInstance & {
  mysql: {
    getConnection: () =>
      Promise<{
        ping: () => Promise<void>;
        release: () => void;
      }>;
    query: (query: string, params?: any[]) => Promise<[any[], any]>;
    pool: {
      end: () => Promise<void>;
    };
  };
};

const buildConnectionString = (config: DbConfig): connString<DbConfig> =>
  `mysql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`; 

export const registerDb = (app: FastifyInstance, config: DbConfig) => {
  app.register(fastifyMysql, {
    promise: true,
    connectionString: buildConnectionString(config),
  });
}

export const makeDbHealthChecker = (app: FastifyInstance): DbHealthChecker =>
  async () => {
    const appWithDb = app as AppWithDb;
    try {
      const conn = await appWithDb.mysql.getConnection();
      await conn.ping();
      conn.release();
      console.log("Database connection successful");
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  };

export const closeDbConnection = async (app: FastifyInstance) => {
  const appWithDb = app as AppWithDb;
  try {
    await appWithDb.mysql.pool.end();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
};

export const makeDbQuery = (app: FastifyInstance) => async (query: string, params?: any[]) => {
  const appWithDb = app as AppWithDb;
  try {
    const [rows] = await appWithDb.mysql.query(query, params);
    return rows;
  } catch (error) {
    console.error("Database query failed:", error);
    throw error;
  }
}