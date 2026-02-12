import { FastifyInstance } from "fastify";
import { healthRoute } from "./health.js";
import { DbHealthChecker } from "../../application/ports/db-health-checker.js";
import { productController } from "../controllers/product.js";
import { CreateProductUseCase } from "../../application/usecases/create-product.js";

type RoutesDeps = {
  dbHealthChecker: DbHealthChecker;
  createProduct: CreateProductUseCase
};

export const registerRoutes = (app: FastifyInstance, deps: RoutesDeps) => {
  healthRoute(app, { dbHealthChecker: deps.dbHealthChecker });
  productController(app, { createProduct: deps.createProduct });
};
