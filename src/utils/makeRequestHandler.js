function makeRequestHandler(controller) {
    return async function (req, res, next) {
        // Request data
        const httpRequestObject = {
            params: req.params,
            query: req.query,
            body: req.body,
            user: req.user
        }

        // Call controller with the request data
        controller(httpRequestObject).then(
            (resp) => {
                return res.status(resp.statusCode).json(resp.body)
            }
        ).catch((err) => next(err))
    }
}

export default makeRequestHandler
