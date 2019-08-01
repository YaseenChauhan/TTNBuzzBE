const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    deptName: String,
    hod: String
});

module.exports = mongoose.model('Department',departmentSchema);