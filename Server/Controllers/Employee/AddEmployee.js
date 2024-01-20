const OrganizationModal = require("../../Models/Organization_Model");
const employees = require("../../Models/Employees");

const AddEmployee = async (req, res) => {

    const { name, email, org_id } = req.body;

    if (!name || !email || !org_id) {
      return res.status(400).json({ error: "All fields are required." });
    }

    var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    function isEmailValid(email) {
        if (email.length > 254) return false;

        var valid = emailRegex.test(email);
        if (!valid) return false;

        // Further checking of some things regex can't handle
        var parts = email.split("@");
        if (parts[0].length > 64) return false;

        var domainParts = parts[1].split(".");
        if (
        domainParts.some(function (part) {
            return part.length > 63;
        })
        )
        return false;

        return true;
    }
    const EmailValid = isEmailValid(email);
    if (EmailValid == false) {
        return res
        .status(400)
        .json({ error: "Enter email @ in proper format abc@domain.com" });
    }
    
    const organizaion = await OrganizationModal.findById(org_id);
    console.log(45,organizaion);
    if (organizaion) {

        const employee = await new employees({
            org_id: org_id,
            name: name,
            email: email,
          });

          try {
            await employee.save();
          } catch (error) {
            console.log("An error occured:>  " + error);
            return res
              .status(500)
              .json({ error: "An error occurred while saving the user." });
          }

        return res.status(200).json({ message: "Added Sucessfully!" });
    }
    else {
        res.status(404).json({ message: "No organization found , enter valid organization" });
    }
}

module.exports = AddEmployee;