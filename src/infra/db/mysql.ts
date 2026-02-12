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

type AppWithDb = FastifyInstance & {
  mysql: {
    getConnection: () =>
      Promise<{
        ping: () => Promise<void>;
        release: () => void;
      }>;
  };
};

export const registerDb = (app: FastifyInstance, config: DbConfig) =>
  app.register(fastifyMysql, {
    promise: true,
    connectionString: `mysql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`,
  });

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