const AppError = require("./AppError");

class NotFountError extends AppError {
    constructor(message = "The request resource could not be found.") {
        super(message, 404);
        this.name = "NotFoundError";
    }
}
module.exports = NotFountError;