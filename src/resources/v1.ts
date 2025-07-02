import { Router } from "express"
import userRoutes from "@src/resources/users/routes"

const v1 = Router()

v1.use('/users', userRoutes)

export default v1