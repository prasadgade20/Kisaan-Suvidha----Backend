class AppError extends Error {
    constructor(message, statusCode, redirect, vRoute) {
            super(message);
            this.statusCode = statusCode;
            this.redirect = redirect || false,
            this.vRoute = vRoute || "",
            this.isOperational = true;

            Error.captureStackTrace(this, this.constructor);
        }
}

module.exports = AppError;
