const express = require("express");
const app = express();
const Cloudinary = require("cloudinary");
const cloud = require("../../Config/Cloudnary.js");
const OrganizationModal = require("../../Models/Organization_Model");

const UpdateProfilePicture = async (req, res, next) => {

    try {
    const userId = req.body.userId;
    if (req.files[0] && userId) {
        const findOrganization = await OrganizationModal.findById(userId);
        const img =  req.files[0].path;
        findOrganization.logo = img;
        await findOrganization.save();
        res.send("done")
    }
    else {
        console.log("File or userId missing");
        res.status(400).send("Bad Request");
    }
    }
    catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = UpdateProfilePicture;
