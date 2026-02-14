import { FastifyInstance } from "fastify";
import { validateProduct } from "../validator/product-dto.js";
import { 
    FindProductByIdUseCase,
    FindProductsUseCase,
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase
} from "../../application/usecases/index.js";

export const productController = (
    app: FastifyInstance,
    deps: { 
        createProduct: CreateProductUseCase,
        findProduct: FindProductByIdUseCase,
        findProducts: FindProductsUseCase,
        updateProduct: UpdateProductUseCase,
        deleteProduct: DeleteProductUseCase
    }
) => {

    app.get("/product/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        if (!id) {
            return reply.status(400).send({ message: "Product ID is required" });
        }
        const product = await deps.findProduct(id);
        if (!product) {
            return reply.status(404).send({ message: "Product not found" });
        }
        return reply.send(product);
    });

    app.get("/products", async (request,reply) => {
        const products = await deps.findProducts();
        return reply.send(products);
    });

    app.post("/product", async (request,reply) => {
        const product = request.body;
        if (!validateProduct(product)) {
            return reply.status(400).send({ message: "Invalid product data" });
        }
        const newProduct = await deps.createProduct(product); 
        if (!newProduct) {
            return reply.status(400).send({ message: "Failed to create product" });
        }
        return reply.status(201).send({ message: "Product created successfully" });
    })

    app.put("/product/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        const data = request.body;
        if (!id) {
            return reply.status(400).send({ message: "Product ID is required" });
        }
        if (!validateProduct(data, 'update')) {
            return reply.status(400).send({ message: "Invalid product data" });
        }
        await deps.updateProduct(id, data);
        return reply.status(200).send({ message: "Product updated successfully" });
    })

    app.delete("/product/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        if (!id) {
            return reply.status(400).send({ message: "Product ID is required" });
        }
        await deps.deleteProduct(id);
        return reply.status(204).send();
    });
}