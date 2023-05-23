import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import morgan from 'morgan'
import config from '../config/index.js'
import { catch404, globalErrorHandler } from './utils/errorHandlers.js'
import authRouter from './routes/auth.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(hpp())
app.use(cors({
    origin: config.clientUrl,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/auth', authRouter)

// ERROR HANDLERS
app.use(catch404)
app.use(globalErrorHandler)

export default app
