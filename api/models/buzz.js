const mongoose = require('mongoose');

const buzzSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type: String,required : true},
    pass: {type: String,required : true},
    email : {type: String,required : true},  
    isAdmin : Boolean,
    buzzImage : String
})

module.exports = mongoose.model('Buzz',buzzSchema);