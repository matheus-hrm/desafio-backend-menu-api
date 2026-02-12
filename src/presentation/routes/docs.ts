

export const SwaggerOptions = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Desafio Backend API',
      description: 'API para gerenciamento de produtos e promoções',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
};