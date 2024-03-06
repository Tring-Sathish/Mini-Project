const OrganizationModal = require("../../Models/Organization_Model");
const { exec } = require('child_process');

const Home = async (req, res, next) => {
    const { organization_id } = req.body.data;
    const organizaion = await OrganizationModal.findById(organization_id);
    if (organizaion) {
        return res.status(200).json({ organizaion })
    }
    else {
        res.status(404).json({ message: "No organization found , enter valid organization" });
    }
    // exec('python C:\\Project\\smart_Recruiter\\Server\\Controllers\\Dashboard\\id3.py', (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Error: ${error.message}`);
    //         return;
    //     }
    //     console.log(`Result: ${stdout}`);
    // });
}

module.exports = Home;