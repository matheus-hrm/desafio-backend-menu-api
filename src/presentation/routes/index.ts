import { FastifyInstance } from "fastify";
import { healthRoute } from "./health.js";
import { DbHealthChecker } from "../../application/ports/db-health-checker.js";
import { registerProductRoutes } from "./product.js";
import type { ProductRepository } from "../../domain/repositories/index.js";
import type { IdGenerator } from "../../application/ports/id-generator.js";

type RoutesDeps = {
  dbHealthChecker: DbHealthChecker;
  productRepository: ProductRepository;
  idGenerator: IdGenerator;
};

export const registerRoutes = (app: FastifyInstance, deps: RoutesDeps) => {
  healthRoute(app, { dbHealthChecker: deps.dbHealthChecker });
  registerProductRoutes(app, {
    productRepository: deps.productRepository,
    idGenerator: deps.idGenerator,
  });

};


 