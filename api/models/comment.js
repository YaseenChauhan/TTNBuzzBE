const mongoose = require('mongoose');
const User = require('../models/user');
const Buzz = require('../models/buzz');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comments: {
        type: String,
        required: true
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    buzzId: {
        type: Schema.Types.ObjectId,
        ref: Buzz
    },
    commentedOn: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Comment', CommentSchema);