const { find } = require("../../Models/Organization_Model");
const OrganizationModal = require("../../Models/Organization_Model");

const UpdateProfileSettings = async (req, res) => {

    const { org_id } = req.body;
    const { inputValue } = req.body;
    const findOrganization = await OrganizationModal.findById(org_id);

}

module.exports = UpdateProfileSettings;