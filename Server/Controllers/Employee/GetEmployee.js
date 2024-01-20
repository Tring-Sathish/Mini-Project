const employees = require("../../Models/Employees");

const GetEmployee = async (req, res) => {

    const { organization_id } = req.body;
    const employee = await employees.find({org_id : organization_id})
    if (employee[0]) {
        return res.status(200).json({ employee })
    }
    else {
        return res.status(400).json({ message: 'There is no employees!' })
    }
}

module.exports = GetEmployee;