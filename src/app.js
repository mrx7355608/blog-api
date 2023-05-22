import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import morgan from 'morgan'
import config from '../config/index.js'

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

export default app
