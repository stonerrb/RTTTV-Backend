const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
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
        validate: {
            validator: function(v) {
                return /^\+91\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Must start with '+91' and have a length of 13.`
        }
    },
    otpToken: {
        type: String,
        trim: true,
        required: true
    },
    createdAt: {type: Date, default: Date.now, index: { expires: 300}}
},{timestamps: true});

// otpSchema.pre('save', async function (next) {
//     const otp = this

//     if (otp.isModified('password')) {
//         otp.password = await bcrypt.hash(otp.password, 8)
//     }

//     next()
// })

// otpSchema.statics.matchCredentials = async (email,phone_number, password)=>{
//     const otp = await OTP.findOne({phone_number: phone_number})
//     if(otp==null){
//         otp = await OTP.findOne({email: email})
//     }

//     if(!otp){
//         return {
//             "status": 0,
//             "message": "Invalid details!!"
//         }
//     }

//     const isMatch = await bcrypt.compare(password, otp.password);

//     if(!isMatch){
//         return {
//             "status": 0,
//             "message": "Invalid details!!"
//         }
//     }
    
//     return {
//         "status": 1,
//         "message": "Success!!",
//         "otp": otp
//     };
// }

const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;