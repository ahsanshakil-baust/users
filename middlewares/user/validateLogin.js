// external imports
const { check, validationResult } = require("express-validator");

// Login Form Input Validation
const loginValidator = [
    check("email").isEmail().withMessage("Invalid email address").trim(),
];

// sending Errors, if not then pass to the next process
const loginValidatorHandler = (req, res, next) => {
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
    loginValidator,
    loginValidatorHandler,
};
