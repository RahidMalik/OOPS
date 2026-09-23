export const ErrorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;

        console.error(err);

        // mongoose error objectId
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        };

        // mongoose duplicate error
        if (err.code === 11000) {
            const message = 'duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        };

        // mongoose ValidationError
        if (err.name === 'ValidateError') {
            const message = Object.values(err.error).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        };

        res.status(error.statusCode || 500).join({
            success: false,
            error: error.message || "Server Error"
        });

    } catch (error) {
        next();
    };
};