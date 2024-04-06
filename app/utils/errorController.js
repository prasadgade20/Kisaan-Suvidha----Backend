const sendErrorDev = (error, res,) => {
    const statusCode = error.statusCode || 500

    if (statusCode !== 500) {
        return res.status(statusCode).send({
            status: "error",
            code: statusCode,
            message: error.message,
            redirect: error.redirect,
            redirectRoute: error.vRoute
            
            // stack: error.stack
        });    
    }else{
        return res.status(statusCode).send({
            status: "error",
            code: statusCode,
            message: error.message,
            stack: error.stack,
            redirect: error.redirect,
            redirectRoute: error.vRoute

        });
    }
    
}

const sendErrorProd = (error, res,) => {
    const statusCode = error.statusCode || 500
    if (error.isOperational) {
        return res.status(statusCode).send({
            status: "error",
            code: statusCode,
            message: error.message,
            redirect: error.redirect,
            redirectRoute: error.vRoute

        });
    }else{
        return res.status(statusCode).send({
            status: "error",
            code: statusCode,
            message: "something went wrong",
            redirect: error.redirect,
            redirectRoute: error.vRoute

        });
    }
}


module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV == 'dev') {
        sendErrorDev(err, res)
    } else {
        sendErrorProd(err, res)
    }
}
