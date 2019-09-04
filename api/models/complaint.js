const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    complaintId : mongoose.Schema.Types.ObjectId,
    department: String,
    title: String,
    name: String,
    email: String,
    complaintContent: String,
    status: { type: String,default:'Pending'},
    assignedTo: String,
    issueId: String,
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Complaint',complaintSchema);