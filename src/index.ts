import express, { json, urlencoded } from 'express'

import userRoutes from './resources/users/routes'

const app = express()
const port = process.env.PORT!

app.use(urlencoded({ extended: false }))
app.use(json())

app.use("/users", userRoutes)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
