import { randomUUID } from "crypto";
import type { IdGenerator } from "../../application/ports/id-generator.js";

export default class GenerateUUID implements IdGenerator {
    generate(): string {
        return randomUUID();
    }
}   