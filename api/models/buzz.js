const mongoose = require('mongoose');

const buzzSchema = mongoose.Schema({
    buzzId: mongoose.Schema.Types.ObjectId,
    category: { type: String, default: 'Activity' },
    buzzContent: String,
    buzzImage: String,
    likes: { type: Number, default: 0 },
    postedOn: { type: Date, default: Date.now() },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

})

module.exports = mongoose.model('Buzz', buzzSchema);