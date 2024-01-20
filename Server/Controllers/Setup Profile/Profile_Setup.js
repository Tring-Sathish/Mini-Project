const { json } = require('express');
const express = require('express');
const app = express();
const Cloudinary = require('cloudinary');
const cloud = require("../../Config/Cloudnary.js");
const jwt = require("jsonwebtoken");
const OrganizationModal = require('../../Models/Organization_Model.js');
const userModel = require('../../Models/User_Model.js');
const { findOneAndUpdate } = require('../../Models/Organization_Model.js');
const ProfileRouter = async (req, res, next) => {
    //    --> ORGANIZATION DEATILS EXTRACTION
    const org_name = req.body.detailed_data.name;
    const phone = req.body.detailed_data.phone;
    const website_link = req.body.detailed_data.website_link;

    if (req.files.length < 1) {
        return res.status(400).json({ message: "Must Attach Profile Picture" });
    }

    const logo = req.files[0].path;
    const departments = req.body.detailed_data.departments;
    const address = req.body.detailed_data.address;
    const city = req.body.detailed_data.city;
    const country = req.body.detailed_data.country;
    const region = req.body.detailed_data.region;
    const fb_link = req.body.detailed_data.fb_link;
    const insta_link = req.body.detailed_data.insta_link;
    const yt_link = req.body.detailed_data.yt_link;
    const linkedIn_link = req.body.detailed_data.linkedin_link;
    // const { name, email, role } = req.body.team_details;
    // const data = [{ name, email, role }];
    var departments2 = [departments]
    departments2 = departments2[0].list
    const u_id = jwt.decode(req.headers.authorization)
    const checkUser = await userModel.findById(u_id.id)
    if (checkUser.org_registered == false) {
        const org = await new OrganizationModal({
            "username": checkUser.username,
            "organization_name": org_name,
            "phoneNo": phone,
            "website": website_link,
            "logo": logo,
            "departments": departments2,
            "office_address": address,
            "office_city": city,
            "office_country": country,
            "fb_url": fb_link,
            "linkedIn_url": linkedIn_link,
            "insta_url": insta_link,
            "yt_url": yt_link,
            // "team_members": data
        })

        try {
            var user_id = org._id;
            user_id = user_id.toString();
            const profile = await userModel.findOneAndUpdate(
                { _id: u_id.id }, // replace with the organization ID
                { $set: { org_registered: true, org_id: user_id } }, // use $set operator to update the field
                { new: true }, // return the updated document
            );
            await org.save()
            await profile.save();
            return res.status(200).json({ message: "user saved" });

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
    else if (checkUser.org_registered == true) {
        return res.status(400).json({ message: "Already Organization Setup Or Fill Employee All Details" })
    }
    return res.status(404).json({ message: "Invalid username" })
}
module.exports = ProfileRouter;