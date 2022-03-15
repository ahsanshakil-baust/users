// It will be use for the instead of cloudinary

// internal imports
const uploader = require("../../utilities/singleFileUploads");

// avatar uploading Function for multer operation
function avatarUpload(req, res, next) {
    const upload = uploader(
        "avatars",
        1000000,
        ["image/jpeg", "image/jpg", "image/png"],
        "Only .jpg, .jpeg or .png format allowed!"
    );

    // call the middleware function
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

// exporting Module
module.exports = avatarUpload;
