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

// userSchema.pre('save', async function (next) {
//     const user = this

//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }

//     next()
// })

userSchema.statics.findUser = async (email,phone_number)=>{
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

    // const isMatch = await bcrypt.compare(password, user.password);

    // if(!isMatch){
    //     return {
    //         "status": 0,
    //         "message": "Invalid details!!"
    //     }
    // }
    
    return {
        "status": 1,
        "message": "Success!!",
        "user": user
    };
}

const User = mongoose.model('User', userSchema);
module.exports = User;