const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    org_id: {
        type: String, default: '0'
    },
    
    name: {
        type: String,
        required: [true],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
});

const Employee = mongoose.model("Employee", empSchema);
module.exports = Employee;