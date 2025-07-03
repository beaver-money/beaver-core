import { globalError } from '@src/middleware/global-error'
import authRoutes from "@src/auth/routes"
import v1 from '@src/resources'
import { asyncHandler } from '@utils/async-handler'
import express, { json, urlencoded } from 'express'

import { withAuth } from '@src/middleware/auth0-jwt'

const app = express()
const port = process.env.PORT!

app.use(urlencoded({ extended: false }))
app.use(json())

app.use("/auth", asyncHandler(authRoutes))
app.use("/api/v1/", withAuth, asyncHandler(v1))

app.use(globalError)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
