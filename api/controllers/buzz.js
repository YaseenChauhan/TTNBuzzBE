const User = require('../models/user');
const Buzz = require('../models/buzz');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const ObjectId = require('mongoose').ObjectID;

module.exports = {
    getAllBuzz: async (req, res, next) => {
        try {
            const buzz = await Buzz.find().populate('postedBy');
            if (buzz) {
                res.status(200).json({
                    buzz,
                    success: true
                }
                );
                console.log(buzz);
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
    getBuzzByuserId: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId).populate('buzzs');
            if (user) {
                res.status(200).json(user.buzzs);
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
    createBuzz: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            if (user) {
                const newBuzz = new Buzz(req.body);
                newBuzz.postedBy = user;
                await newBuzz.save();
                user.buzzs.push(newBuzz);
                await user.save();
                res.status(201).json(newBuzz);

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
    updateBuzz: async (req, res, next) => {
        try {
            const { buzzId } = req.params;
            const buzz = req.body;
            const user = await Buzz.findByIdAndUpdate(buzzId, buzz);
            if (user) {
                res.status(201).json(user);
            }
            else {
                res.status(404).json({
                    message: 'Buzz does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    modifyBuzz: async (req, res, next) => {
        try {
            const { buzzId } = req.params;
            const buzz = req.body;
            const user = await Buzz.findByIdAndUpdate(buzzId, buzz);
            if (user) {
                res.status(201).json(user);

            }
            else {
                res.status(404).json({
                    message: 'Buzz does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

}