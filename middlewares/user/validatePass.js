// external imports
const { check, validationResult } = require("express-validator");

// Login Form Input Validation
const passValidator = [
    check("password")
        .isStrongPassword()
        .withMessage("Must be 8 char and one Capital,Smaller,Number & Symbol"),
];

// sending Errors, if not then pass to the next process
const passValidatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();

    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.status(500).json({
            errors: mappedError,
        });
    }
};

// exporting modules
module.exports = {
    passValidator,
    passValidatorHandler,
};
