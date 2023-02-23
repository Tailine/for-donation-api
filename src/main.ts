import 'reflect-metadata'
import '@config/typeorm'
import cookieParser from 'cookie-parser'
import express from 'express'
import { donationRoutes } from 'routes/donation'
import { categoryRoutes } from 'routes/category'
import { userRoutes } from 'routes/user'
import { placeRoutes } from 'routes/place'
import cors from 'cors'

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({ credentials: true, origin: process.env.ORIGIN }))
app.use(cookieParser())
app.use(express.json())

app.use('/donations', donationRoutes)
app.use('/users', userRoutes)
app.use('/places', placeRoutes)
app.use('/categories', categoryRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
