const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
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
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be positive')
            }
        }
    },
    phone_number: {
        type: String,
        required: true,
        minlength: 10,
        // maxlength: 10
    },
    otpToken: {
        type: String,
        trim: true,
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

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.statics.matchCredentials = async (email,phone_number, password)=>{
    const user = await User.findOne({phone_number: phone_number})
    if(user==null){
        user = await User.findOne({email: email})
    }

    if(!user){
        return {
            "status": 0,
            "message": "Invalid details!!"
        }
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return {
            "status": 0,
            "message": "Invalid details!!"
        }
    }
    
    return {
        "status": 1,
        "message": "Success!!",
        "user": user
    };
}

const User = mongoose.model('User', userSchema);
module.exports = User;