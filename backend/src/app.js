import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
)

app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

export default app
