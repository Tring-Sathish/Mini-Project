const ProfileRouter = require('../Controllers/Setup Profile/Profile_Setup');
const multer = require('multer')
const express = require('express');
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const VerifyToken = require('../Middleware/VerifyToken');
const ProfileSetup = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const multerFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, multerFilter });

ProfileSetup.post("/setup", AuthMiddleware,upload.any('logo'), ProfileRouter);
ProfileSetup.post("/", (req, res) => {
    res.send("welcome")
})
module.exports = ProfileSetup;
