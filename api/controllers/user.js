const express = require('express');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const User = require('../models/user');

signToken = (user) => {
    return JWT.sign({
        iss: 'Yaseen',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET)
}

module.exports = {
    googleAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(201).json({
            message: req.authInfo.message,
            Token: token
        });

    },
    getUser: async (req, res, next) => {
        const users = await User.find();
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

    getUserById: async (req,res,next) => {
        try {
            const users = await User.findById({_id: req.value.params.userId});
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
    }
};