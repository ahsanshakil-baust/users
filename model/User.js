// external imports
const mongoose = require("mongoose");

// make a mongoose schema
const peopleSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        cloudinaryId: {
            type: String,
        },
        isVerify: {
            type: Boolean,
            default: false,
        },
        token: {
            type: String,
        },
        role: {
            type: String,
            enum: ["member", "editor", "admin", "superadmin"],
            default: "member",
        },
    },
    { timestamps: true }
);

// make a mongoose model
const People = new mongoose.model("People", peopleSchema);

// exporting module
module.exports = People;
