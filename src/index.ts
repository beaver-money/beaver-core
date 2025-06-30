import express, { json, urlencoded } from 'express'
import productsRoutes from './routes/products'

const app = express()
const port = process.env.PORT!

app.use(urlencoded({ extended: false }))
app.use(json())

app.use("/products", productsRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
