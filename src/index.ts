import { globalError } from '@src/middleware/global-error'
import authRoutes from "@src/resources/auth/routes"
import v1 from '@src/resources/v1'
import { asyncHandler } from '@utils/async-handler'
import express, { json, urlencoded } from 'express'
import passport from '@src/auth/passport'

const app = express()
const port = process.env.PORT!

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(passport.initialize());

app.use("/auth", asyncHandler(authRoutes))
app.use("/api/v1/", asyncHandler(v1))

app.use(globalError)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
