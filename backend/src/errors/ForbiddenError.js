const AppError = require("./AppError");

class ForbiddenError extends AppError {
    constructor(message = "You do not have permission to do this") {
        super(message, 403);
        this.name = "ForbiddenError"
    };
};

module.exports = ForbiddenError;