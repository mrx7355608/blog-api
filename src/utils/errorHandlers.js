import config from '../../config/index.js'

function catch404(req, res) {
    return res.status(404).json({
        error: 'Page not found'
    })
}

function globalErrorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500
    const error = err.message

    // Send error stack in dev mode
    if (config.nodeEnv === 'dev') {
        return res.status(statusCode).json({ 
            error,
            stack: err.stack
        })
    }
    return res.status(statusCode).json({ error })
}

export { catch404, globalErrorHandler }
