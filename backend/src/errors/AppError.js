class AppError extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
        this.status = statuscode >= 500 ? 'error' : 'fail';
        this.isOperational = true;

        Error.captureStackTrace()
    }
}