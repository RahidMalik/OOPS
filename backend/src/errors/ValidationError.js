const AppError = require("./AppError");

class ValidationError extends AppError {
    constructor(message = "invalid input data") {
        super(message);
        this.name = "ValidationError";
    };
};

module.exports = ValidationError;