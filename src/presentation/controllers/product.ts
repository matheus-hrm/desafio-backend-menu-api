import { FastifyInstance } from "fastify";
import { CreateProductUseCase } from "../../application/usecases/create-product.js";

export const productController = (
    app: FastifyInstance,
    deps: { createProduct: CreateProductUseCase }
) => {
    app.get("/products", async (request, reply) => {
        return reply.send({ message: "List of products" });
    });
    app.post("/product", async (request,reply) => {
        const product = request.body;
        // valide product data is of type CreateProductDTO
        // if (validateProduct(newProduct)) {
        //     return reply.status(400).send({ message: "Invalid product data" });
        // }
        const newProduct = await deps.createProduct(product as any); // fix later
        if (!newProduct) {
            return reply.status(400).send({ message: "Failed to create product" });
        }
        return reply.status(201).send({ message: "Product created successfully" });
    })
}