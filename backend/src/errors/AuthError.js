const AppError = require('./AppError');


class AuthError extends AppError {
    constructor(message = "Your are not logged in. Please login first") {
        super(message, 401);
        this.name = "AuthError";
    }
}

module.exports = AuthError;