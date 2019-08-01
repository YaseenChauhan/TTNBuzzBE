const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    department: String,
    title: String,
    Name: String,
    email: String,
    content: String,
    status: { type: String,default:'Pending'},
    assignedTo: String,
    issueId: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Complaint',complaintSchema);