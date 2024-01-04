const mongoose = require('mongoose');
// const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    phone_number: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ],
    profiles:[
        {
            profile:{
                type:Object
            }
        }
    ],
});

module.exports = mongoose.model('User', userSchema);