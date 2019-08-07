const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: String,
    email: String,
    role: String
});

module.exports = mongoose.model('Role',roleSchema);