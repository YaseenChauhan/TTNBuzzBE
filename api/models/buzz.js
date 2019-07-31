const mongoose = require('mongoose');
const  timestamps = require('mongoose-timestamp');

const buzzSchema = mongoose.Schema({
    buzzId : mongoose.Schema.Types.ObjectId,
    category: String,
    content: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    
})

module.exports = mongoose.model('Buzz',buzzSchema);