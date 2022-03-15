// external imports
const createError = require("http-errors");

// If wrong url passed then this error will be firing
const notFoundHandler = (req, res, next) => {
    next(createError(404, "Url not Found!"));
};

// It mainly use for default error handling representation
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        errors: {
            common: {
                msg: err.message,
            },
        },
    });
};

// exporting Modules
module.exports = {
    notFoundHandler,
    errorHandler,
};
