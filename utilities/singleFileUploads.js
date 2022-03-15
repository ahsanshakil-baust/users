// external imports
const createError = require("http-errors");
const multer = require("multer");
const path = require("path");

// single file uploading fuction for multer
const singleFileUploads = (subfolder, max_size, file_Types, error_msg) => {
    // select ther location where wants to upload files
    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder}/`;

    // multer storage setup
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER);
        },
        // for genrating and beauty files name
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLocaleLowerCase()
                    .split(" ")
                    .join("-") +
                "-" +
                Date.now();

            cb(null, fileName + fileExt);
        },
    });

    // uploading file setup
    const upload = multer({
        storage: storage,
        // ile size limits
        limits: {
            fileSize: max_size,
        },
        // filter a file which types are aceptable
        fileFilter: (req, file, cb) => {
            if (file_Types.includes(file.mimetype) > -1) {
                cb(null, true);
            } else {
                cb(createError(error_msg));
            }
        },
    });

    // returning the upload
    return upload;
};

// exporting Module
module.exports = singleFileUploads;
