import { listProducts, getProductById, updateProduct, deleteProduct, createProduct } from "@controllers/products"
import { Router } from "express"

const router = Router()

router.get("/", listProducts)
router.post("/", createProduct)
router.get("/:id", getProductById)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router