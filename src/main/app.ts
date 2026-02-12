import { makeDbHealthChecker, makeDbQuery, registerDb } from '../infra/db/mysql.js'
import { ProductRepository } from '../infra/repositories/product-repository.js'
import { makecreateProduct } from '../application/usecases/create-product.js'
import { registerRoutes } from '../presentation/routes/index.js'
import { databaseConfig } from './config/env.js'
import GenerateUUID from '../infra/ids/index.js'
import Fastify from 'fastify'

const app = Fastify({ logger: true })

registerDb(app, databaseConfig)
const dbHealthChecker = makeDbHealthChecker(app)
const productRepository = new ProductRepository(makeDbQuery(app))
const idGenerator = new GenerateUUID()
const createProduct = makecreateProduct({
  ProductRepository: productRepository,
  IdGenerator: idGenerator
})

registerRoutes(app, {
  dbHealthChecker,
  createProduct
})

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()