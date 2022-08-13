import express from 'express'
import { donationRoutes } from 'routes/donation'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use('/donation', donationRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
