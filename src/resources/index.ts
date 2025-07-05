import { Router } from "express"
import userRoutes from "@src/resources/users/routes"
import accountRoutes from "@src/resources/accounts/routes"

const v1 = Router()

v1.use('/users', userRoutes)
v1.use('/accounts', accountRoutes)

export default v1