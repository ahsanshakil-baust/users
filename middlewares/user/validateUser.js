// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// internal imports
const User = require("../../model/User");

// Registration Form Input Validation
const inputValidator = [
    check("username")
        .isLength({ min: 1 })
        .withMessage("Username Required!")
        .isAlpha("en-US", { ignore: "_- " })
        .withMessage("Username must not contain Alphabets")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError("Email already used!");
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check("mobile")
        .isMobilePhone("bn-BD", { strictMode: true })
        .withMessage("Must be a BD phone Number"),
    check("password")
        .isStrongPassword()
        .withMessage(
            "Must be 8 characters long and should contains at least 1 uppercase, lowercase, number and symbol"
        ),
];

// sending Errors, if not then pass to the next process
const inputValidatorHandler = (req, res, next) => {
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
    inputValidator,
    inputValidatorHandler,
};
