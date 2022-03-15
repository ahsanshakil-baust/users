// It will be use for the instead of multer

// external imports
const cloudinary = require("cloudinary").v2;

// setup for cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// exporting Module
module.exports = { cloudinary };
