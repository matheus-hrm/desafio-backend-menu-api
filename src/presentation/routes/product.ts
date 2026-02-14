import { FastifyInstance } from "fastify";
import { productController } from "../controllers/product.js";
import type { ProductRepository } from "../../domain/repositories/index.js";
import type { IdGenerator } from "../../application/ports/id-generator.js";
import {
  makeCreateProduct,
  makeDeleteProduct,
  makeFindProductById,
  makeFindProducts,
  makeUpdateProduct,
} from "../../application/usecases/index.js";

type RegisterProductRoutesDeps = {
  productRepository: ProductRepository;
  idGenerator: IdGenerator;
};

export const registerProductRoutes = (
  app: FastifyInstance,
  deps: RegisterProductRoutesDeps
) => {
  const createProduct = makeCreateProduct({
    ProductRepository: deps.productRepository,
    IdGenerator: deps.idGenerator,
  });

  const findProduct = makeFindProductById(deps.productRepository);
  const findProducts = makeFindProducts({
    ProductRepository: deps.productRepository,
  });

  const updateProduct = makeUpdateProduct({
    productRepository: deps.productRepository,
  });

  const deleteProduct = makeDeleteProduct({
    productRepository: deps.productRepository,
  });

  productController(app, {
    createProduct,
    findProduct,
    findProducts,
    updateProduct,
    deleteProduct,
  });
};
