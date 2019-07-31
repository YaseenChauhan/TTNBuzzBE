const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    googleId: {
        type: String,
        lowercase: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        lowercase: true,
        required: true
    },
    buzzs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Buzz' }],
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }]
});
module.exports = mongoose.model('User', userSchema);