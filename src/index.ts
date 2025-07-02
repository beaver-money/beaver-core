import express, { json, urlencoded } from 'express'

const app = express()
const port = process.env.PORT!

app.use(urlencoded({ extended: false }))
app.use(json())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
