const Complaint = require('../models/complaint');
const Department = require('../models/department');
const User = require('../models/user');

module.exports = {
    getAllComplaint: async (req, res, next) => {
        try {
            const user = await User.find().populate('complaints');
            if (user) {
                const response = user.map(comp => {
                    return {
                        username: comp.username,
                        complaints: comp.complaints
                    };
                });
                res.status(200).json({
                    'data': response,
                    success: true
                }
                );
            }
            else {
                res.status(404).json({
                    message: 'User does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    },
    getComplaintByUserId: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId).populate('complaints');
            if (user) {
                res.status(200).json({
                    'data': user.complaints,
                    success: true
                }
                );
            }
            else {
                res.status(404).json({
                    message: 'User does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    },
    submitComplaint: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            if (user) {
                const dept = req.body.department;
                const depts = await Department.findOne({ deptName: dept }).select('hod');
                const characters = '0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ';
                let _issueId = '';
                for (let i = 0; i < 8; i++) {
                    _issueId += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                const newComplaint = new Complaint({
                    ...req.body,
                    assignedTo: depts.hod,
                    issueId: 'IG' + _issueId,
                    userId
                });
                await newComplaint.save();
                user.complaints.push(newComplaint);
                await user.save();
                res.status(201).json(newComplaint);
            }
            else {
                res.status(404).json({
                    message: 'User does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    modifyComplaint: async (req, res, next) => {
        try {
            const { complaintId } = req.params;
            const complaint = req.body;
            const user = await Complaint.findByIdAndUpdate(complaintId, complaint);
            if (user) {
                res.status(201).json({
                    data: user,
                    success: true
                })
            }
            else {
                res.status(404).json({
                    message: 'Complaint does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    updateComplaint: async (req, res, next) => {
        try {
            const { complaintId } = req.params;
            const complaint = req.body;
            const user = await Complaint.findByIdAndUpdate(complaintId, complaint);
            if (user) {
                res.status(201).json({
                    data: user,
                    success: true
                })
            }
            else {
                res.status(404).json({
                    message: 'complaint does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    deleteComplaint: async (req, res, next) => {
        try {
            const { complaintId } = req.params;
            const complaint = await Complaint.findById(complaintId);
            if (complaint) {
                const userId = complaint.userId;
                const user = await User.findById(userId);
                await complaint.remove();

                user.complaints.pull(complaint);
                await user.save();
                res.status(201).json({
                    success: true
                })
            }
            else {
                res.status(404).json({
                    message: 'data not found',
                    success: false
                })
            }

        }
        catch (error) {

        }

    }
}