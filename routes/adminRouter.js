// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
    getAllUsers,
    editUser,
    deleteUser,
} = require("../controllers/adminController");
const { checkLogin } = require("../middlewares/common/checkLogin");

// get all users on Admin Pannel
router.get("/all", checkLogin, getAllUsers);

// edit user role by Admin
router.post("/all/:id", checkLogin, editUser);

// delete an user by Admin
router.delete("/all/:id", checkLogin, deleteUser);

// exporting Modules
module.exports = router;
