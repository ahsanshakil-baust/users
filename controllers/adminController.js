// internal imports
const User = require("../model/User");

// get all users on Admin Pannel Function
const getAllUsers = async (req, res) => {
    const { role } = req.user;

    // if role is member or editor then can't access all users
    if (role === "member" || role === "editor") {
        res.status(200).json({
            role: "Members and Editors can not access this page",
        });
    }

    // checking the role is admin or superadmin
    if (role === "admin" || role === "superadmin") {
        try {
            // returning all users information
            const user = await User.find();

            let allUsers = [];
            // checking all users account verified by their email. Then push verified user info to the allusers array.
            user.forEach((u) => {
                if (u.isVerify && u.email !== req.user.email) {
                    allUsers.push(u);
                }
            });
            // If allUsers array not Empty then it passed the all user info as a json
            if (allUsers) {
                res.status(200).json({
                    allUsers,
                });
            } else {
                // it indicates that,there will be a server error occurred
                res.status(500).json({
                    errors: {
                        common: { msg: "Server Error!" },
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
    }
};

// edit an user by Admin Function
const editUser = async (req, res) => {
    const { role } = req.user;
    // if role is member or editor then can't access all users
    if (role === "member" || role === "editor") {
        res.status(200).json({
            role: "Members and Editors can not access this page",
        });
    }

    // checking the role is admin or superadmin
    if (role === "admin" || role === "superadmin") {
        const { id } = req.params;

        try {
            // returning user information by user id
            const user = await User.findOne({ _id: id });
            let userRole;

            // checking all users account verified by their email and also matched with their email
            if (user && user.isVerify && user.email !== req.user.email) {
                // check the role
                if (role === "admin") {
                    userRole = await User.findOneAndUpdate(
                        {
                            $and: [
                                { _id: id },
                                { role: { $ne: "superadmin" } },
                                { role: { $ne: "admin" } },
                            ],
                        },
                        {
                            role:
                                req.body.role !== "superadmin"
                                    ? req.body.role
                                    : user.role,
                        },
                        {
                            new: true,
                            useFindAndModify: false,
                        }
                    );
                }
                // check the role
                if (role === "superadmin") {
                    userRole = await User.findOneAndUpdate(
                        {
                            $and: [
                                { _id: id },
                                { role: { $ne: "superadmin" } },
                            ],
                        },
                        {
                            role:
                                req.body.role !== "superadmin"
                                    ? req.body.role
                                    : user.role,
                        },
                        {
                            new: true,
                            useFindAndModify: false,
                        }
                    );
                }
            }

            // If user role then user role passed as a json to catch
            if (userRole) {
                res.status(200).json({ userRole });
            } else {
                // It will send a respone why not user role can't be editable
                res.status(500).json({
                    errors: {
                        common: {
                            msg: `${role} can not edit ${
                                role === "admin"
                                    ? "admin and superadmin"
                                    : "superadmin"
                            }`,
                        },
                    },
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
    }
};

// delete an user by Admin Function
const deleteUser = async (req, res) => {
    const { role } = req.user;

    // if role is member or editor then can't access all users
    if (role === "member" || role === "editor") {
        res.status(200).json({
            role: "Members and Editors can not access this page",
        });
    }

    // checking the role is admin or superadmin
    if (role === "admin" || role === "superadmin") {
        const { id } = req.params;

        try {
            let userRole;

            // check the role
            if (role === "admin") {
                // returning user information by user id that was n't a admin or superadmin
                userRole = await User.findOneAndDelete({
                    $and: [
                        { _id: id },
                        { role: { $ne: "superadmin" } },
                        { role: { $ne: "admin" } },
                        { email: { $ne: req.user.email } },
                    ],
                });
            }

            // check the role
            if (role === "superadmin") {
                userRole = await User.findOneAndDelete({
                    $and: [
                        { _id: id },
                        { role: { $ne: "superadmin" } },
                        { email: { $ne: req.user.email } },
                    ],
                });
            }
            // If user role then user role passed as a json to catch
            if (userRole) {
                res.status(200).json({ userRole });
            } else {
                // It will send a respone why not user role can't be deleteable
                res.status(500).json({
                    errors: {
                        common: {
                            msg: `${role} can not delete ${
                                role === "admin"
                                    ? "admin and superadmin"
                                    : "superadmin"
                            }`,
                        },
                    },
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
    }
};

// exporting Modules
module.exports = {
    getAllUsers,
    editUser,
    deleteUser,
};
