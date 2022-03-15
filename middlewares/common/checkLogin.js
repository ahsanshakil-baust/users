// external imports
const jwt = require("jsonwebtoken");

// internal exports
const environment = require("../../helpers/environment");

// It will be work as a middleware for geting a user,updating
const checkLogin = async (req, res, next) => {
    // checking for if there any cookie presents
    let cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookies) {
        try {
            // checking the required cookie present and collect its token data that was past before sending this cookie
            token = cookies[environment.cookie_name];
            // decode the token data
            const decode = await jwt.verify(token, environment.token);
            // send the decoded data req.user for further uses
            req.user = decode;
            // next function will be send it to the next proccess if it valid
            next();
        } catch (err) {
            // If the cookie not exists this error will be fire
            res.status(500).json({
                errors: {
                    common: {
                        msg: "Authentication failure",
                    },
                },
            });
        }
    } else {
        // If there is no cookie this error will be fire
        res.status(500).json({
            errors: {
                common: {
                    msg: "Authentication failure",
                },
            },
        });
    }
};

// exporting Modules
module.exports = {
    checkLogin,
};
