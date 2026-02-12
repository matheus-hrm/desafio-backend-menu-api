import { FastifyInstance } from "fastify";
import type { DbHealthChecker } from "../../application/ports/db-health-checker.js";

type HealthRouteDeps = {
    dbHealthChecker: DbHealthChecker;
};

export const healthRoute = (app: FastifyInstance, deps: HealthRouteDeps) => {
    app.get("/health", async (request, reply) => {
        return { status: "ok" };
    });
    app.get("/database-health", async (request, reply) => {
        await deps.dbHealthChecker();
        return { status: "ok" };
    });
}