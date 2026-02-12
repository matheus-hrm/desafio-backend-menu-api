import Fastify from 'fastify'
import { makeDbHealthChecker, registerDb } from '../infra/db/mysql.js'
import { databaseConfig } from './config/env.js'
import { registerRoutes } from '../presentation/routes/index.js'

const app = Fastify({ logger: true })

registerDb(app, databaseConfig)
const dbHealthChecker = makeDbHealthChecker(app)
registerRoutes(app, { dbHealthChecker })

const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()