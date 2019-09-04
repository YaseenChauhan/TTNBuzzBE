const express = require('express');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const User = require('../models/user');

signToken = (user) => {
    return JWT.sign({
        iss: 'user.username',
        sub: user.id,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, JWT_SECRET)
}

module.exports = {
    googleAuth: (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({
            message: req.authInfo.message,
            Token: token,
            user: req.user
        });

    },
    getUser: async (req, res, next) => {
        const users = await User.find().populate('buzzs').populate('complaints');
        try {
            if (users) {
                res.status(200).json({
                    data: users
                });
            }
            else {
                res.status(200).json({
                    message: 'Data not found'
                });
            }

        }
        catch (error) {
            res.status(500).json({
                message: error
            });
        }

    },

    getUserById: async (req, res, next) => {
        try {
            const users = await User.findById({ _id: req.value.params.userId }).populate('buzzs').populate('complaints');
            if (users) {
                res.status(200).json({
                    data: users
                });
            }
            else {
                res.status(200).json({
                    message: 'Data not found'
                });
            }

        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                message: error
            });
        }
    }
};