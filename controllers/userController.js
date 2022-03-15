// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// internal imports
const environment = require("../helpers/environment");
const { cloudinary } = require("../middlewares/user/cloudinaryUpload");
const User = require("../model/User");

// Register a user
const addUser = async (req, res) => {
    // getting data from registration form
    const { username, email, mobile, password, cpassword } = req.body;
    let user;
    // hashing password for security perpouse
    const hashedPassword = await bcrypt.hash(password, 10);

    // matching with retype password
    if (password === cpassword) {
        // create a new user model
        user = new User({
            username,
            email,
            mobile,
            password: hashedPassword,
            token: crypto.randomBytes(64).toString("hex"),
        });
        try {
            // create a transporter for nodemailer
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "shakilahsan46@gmail.com",
                    pass: "16827700",
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            // send verification mail to user
            const mailOptions = {
                from: '"Verify your email" <shakilahsan46@gmail.com>',
                to: user.email,
                subject: "verify your email",
                html: `<h2>${user.username}! Thanks for registering on our site</h2> 
        <h4> Please verify your mail to continue...</h4> <a href="http://${req.headers.host}/user/verify-email/${user.token}">verify your Email</a>`,
            };

            // sending mail
            const result = await transporter.sendMail(mailOptions);

            // check if mail is sending
            if (result) {
                // save the user to the database
                await user.save();

                // notify to verify the email
                res.status(200).json({
                    msg: "Verification sent to your email account.",
                });
            } else {
                // not sending error
                res.status(500).json({
                    errors: {
                        common: { msg: "can not send mail!" },
                    },
                });
            }
        } catch (err) {
            // server error
            res.status(500).json({
                errors: {
                    common: { msg: err.message },
                },
            });
        }
    } else {
        // password not matching error
        res.status(400).json({
            errors: {
                common: { msg: "Password do not matches" },
            },
        });
    }
};

// get User by Login with email and password
const getUser = async (req, res) => {
    try {
        // Find registered user by their email and mobile
        const user = await User.findOne({
            $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
        });
        // checking is there any user and also there id
        if (user && user._id) {
            // comparing user hashed password with req.body password by bcrypt
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            // is matching finded user password tothe given body password then passed throw
            if (isValidPassword) {
                const isVerified = user.isVerify;

                // check is user verified its account by their email
                if (isVerified) {
                    // create token object to generate a token for a particular user
                    const tokenObject = {
                        id: user._id,
                    };

                    // generating a token by token object to pass it to the cookie
                    const token = jwt.sign(tokenObject, environment.token, {
                        expiresIn: "1d",
                    });
                    // sending a signed cookie with token
                    res.cookie(environment.cookie_name, token, {
                        maxAge: 86400000,
                        httpOnly: true,
                        signed: true,
                    });
                    // user information passed as json
                    res.status(200).json({ user: user });
                } else {
                    // if email verification not done then it will be fireing
                    res.status(500).json({
                        errors: {
                            common: { msg: "Email not verified!" },
                        },
                    });
                }
            } else {
                // user error
                throw createError("Provide your information correctly!");
            }
        } else {
            // Server Error
            throw createError("Login failed!");
        }
    } catch (err) {
        // Server Error
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};

// get LoggedIn user
const loggedInUser = async (req, res) => {
    // Find registered user by their id
    const userlog = await User.findById(req.user.id).select("-password");
    if (userlog) {
        // user info response
        res.status(200).json({
            user: userlog,
        });
    } else {
        // server Error
        res.status(500).json({
            errors: {
                common: {
                    msg: "not found user",
                },
            },
        });
    }
};

// logout user
const logout = (req, res) => {
    // clear the cookie that was passed for geting user
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("loggedout");
};

// update user
const updateUser = async (req, res) => {
    // getting id by cookie
    const { id } = req.user;
    // get the information by a form
    const { vpassword, password, cpassword, username, mobile } = req.body;

    let updateObject = {};

    try {
        // get the user by cookies token information
        const userInfo = await User.findById(req.user.id);

        if (password && cpassword && vpassword) {
            // checking cookie user password match to the given password
            const isverified = await bcrypt.compare(
                vpassword,
                userInfo.password
            );
            console.log(isverified);
            // check is password was matched
            if (isverified) {
                // changing password retype matching
                if (password === cpassword) {
                    // hashing the new changing password
                    const hashedPassword = await bcrypt.hash(password, 15);
                    // creating the updating object
                    updateObject = {
                        password: hashedPassword,
                    };
                    // find a user by its id and update
                    const user = await User.findOneAndUpdate(
                        { _id: id },
                        updateObject,
                        {
                            new: true,
                            useFindAndModify: false,
                        }
                    );
                    // user response after update
                    res.status(200).json({
                        user: user,
                    });
                } else {
                    // error for the unmatched returned response
                    res.status(400).json({
                        errors: {
                            common: { msg: "New password do not matches!" },
                        },
                    });
                }
            } else {
                // error for the not verify with old password, returned response
                res.status(400).json({
                    errors: {
                        common: { msg: "Your old password does not matches!" },
                    },
                });
            }
        }

        if (username && mobile) {
            // if other data need to be update
            updateObject = {
                username,
                mobile,
            };
            // find a user by its id and update
            const user = await User.findOneAndUpdate(
                { _id: id },
                updateObject,
                {
                    new: true,
                    useFindAndModify: false,
                }
            );
            // user response after update
            res.status(200).json({
                user: user,
            });
        }

        // if only file data need to be update or post
        if (req.body.data && req.body.data.length > 0) {
            // before upload or update a file need to clear the previous fle for update
            if (userInfo.cloudinaryId) {
                await cloudinary.uploader.destroy(userInfo.cloudinaryId);
            }
            // file like image uploaded data
            const fileStr = req.body.data;
            // uploading the image data to the cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: "estofucv",
            });
            // creating the updating object
            updateObject = {
                avatar: uploadedResponse.url,
                cloudinaryId: uploadedResponse.public_id,
            };

            // find a user by its id and update
            const user = await User.findOneAndUpdate(
                { _id: id },
                updateObject,
                {
                    new: true,
                    useFindAndModify: false,
                }
            );
            // user response after update
            res.status(200).json({
                user: user,
            });
        }
    } catch (err) {
        // Server Error
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};

// verify email
const verifyEmail = async (req, res) => {
    console.log("hi");

    try {
        // get the token by query
        const token = req.params.token;
        console.log(token);
        // find the user by given token to the user
        const user = await User.findOne({ token });
        // check is the user exists
        if (user) {
            // update the user token null
            user.token = null;
            // also update isVerify true
            user.isVerify = true;
            // save the user to the database
            await user.save();
            // giving a success response
            res.status(200).json({
                msg: "verified!",
            });
        } else {
            // Server Error
            res.status(500).json({
                errors: {
                    common: { msg: "Email is not verified" },
                },
            });
        }
    } catch (err) {
        // Server Error
        res.status(500).json({
            errors: {
                common: { msg: err.message },
            },
        });
    }
};

// exporting modules
module.exports = {
    addUser,
    getUser,
    updateUser,
    verifyEmail,
    loggedInUser,
    logout,
};
