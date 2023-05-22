import 'dotenv/config'
import http from 'http'
import app from './app.js'
import config from '../config/index.js'

const server = http.createServer(app)
const port = config.port || 8000

async function startServer() {
    // TODO: connect to database
    
    server.listen(port, () => {
        console.log('express server started on port', port)
    })
}

startServer()
