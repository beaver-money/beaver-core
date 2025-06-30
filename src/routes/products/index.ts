import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.send("the list of products")
})

router.post("/", (req, res) => {
    res.send("new product created")
})

router.get("/:id", (req, res) => {
    console.log(req.params)
    res.send("the list of products")
})

export default router