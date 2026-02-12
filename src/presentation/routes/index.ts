import { FastifyInstance } from "fastify";
import { healthRoute } from "./health.js";
import { DbHealthChecker } from "../../application/ports/db-health-checker.js";

type RoutesDeps = {
  dbHealthChecker: DbHealthChecker;
};

export const registerRoutes = (app: FastifyInstance, deps: RoutesDeps) => {
  healthRoute(app, { dbHealthChecker: deps.dbHealthChecker });
};
