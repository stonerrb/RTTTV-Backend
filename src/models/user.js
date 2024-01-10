const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
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
        unique: true,
        validate: {
            validator: function(v) {
                return /^\+91\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Must start with '+91' and have a length of 10.`
        }
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

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    
    // Set the expiration time to 15 days (in seconds)
    const expiresIn = 15 * 24 * 60 * 60;

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn });
    
    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    return token;
};

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.tokens
    
    return userObject
}

userSchema.statics.findUser = async (email,phone_number)=>{
    let user = await User.findOne({phone_number: phone_number})
    if(user==null){
        user = await User.findOne({email: email})
    }

    if(!user){
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