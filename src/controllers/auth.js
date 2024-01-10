const User = new require('../models/user.js')
const OTP = new require('../models/otp.js')

const {OTPverification, jwtToken} = require('../util/auth.js')

const authSignup = async (req, res)=>{
    console.log("Signup Page:::")
    const {phone_number, age, email} = req.body;
    if(req.body==null || phone_number==null || age==null || email==null){
        res.status(400).send({
            "code": 0,
            "status": "Error",
            "message": "Enter valid details!!"
        })
    }
    
    try{
        const user = await User.findOne({phone_number})

        if(user==null){
            const newUser = OTP(req.body)

            const otpToken = OTPverification(phone_number);
            if(otpToken.status==1){
                newUser.otpToken = otpToken;

                await newUser.save()
    
                return res.status(200).send({
                    "code": 1,
                    "status": "Success",
                    "message": "OTP sent successfully to Email and Phone No.",
                    "user": newUser
                })
            }else{
                res.status(401).send({
                    "code": 0,
                    "status": "Error",
                    "message": otpToken.message
                })
            }
        }

        return res.status(400).send({
            "code": 0,
            "status": "Error",
            "message": "Phone Number already exists!!"
        })
    }catch(err){
        return res.status(500).send({
            "code": 0,
            "status": "Failure",
            "message": err.toString()
        })
    }
}

const authLogin = async (req, res)=>{
    console.log("Login Page:::")

    const {phone_number, email} = req.body;
    if(req.body==null || (phone_number==null && email==null)){
        res.status(400).send({
            "code": 0,
            "status": "Error",
            "message": "Enter valid details!!"
        })
    }

    try{
        const check = await User.findUser(email,phone_number);
        if(check.status==1){

            const otpToken = OTPverification(check.user.phone_number);
            if(otpToken.status==1){
                const newOTP = {
                    "phone_numer": check.user.phone_number,
                    "otp": otpToken
                }
    
                const newOTPUser = OTP(newOTP);
                
                await newOTPUser.save();
    
                return res.status(200).send({
                    "code": 1,
                    "status": "Success!!",
                    "message": "OTP sent successfully to Email and Phone No.",
                    "user": check.user
                })
            }else{
                res.status(401).send({
                    "code": 0,
                    "status": "Error",
                    "message": otpToken.message
                })
            }
        }

        res.status(401).send({
            "code": 0,
            "status": "Error",
            "message": check.message
        })
    }catch(err){
        return res.status(500).send({
            "code": 0,
            "status": "Failure",
            "message": err.toString()
        })
    }
}

const authverify = async (req, res)=>{
    console.log("Verify Page:::")
    const phone_number = req.params.phone_number
    const {otp} = req.body;
    
    if(req.body==null || otp==null || phone_number==null){
        res.status(400).send({
            "code": 0,
            "status": "Error",
            "message": "Enter valid details!!"
        })
    }

    try{
        const user = await User.findOne({phone_number:phone_number});
        const otp = await OTP.find({phone_number: phone_number})
        if(user!=null || otp.length!=0){
            if(otp.length!=0){
                const latestOTP = otp[otp.length-1]
                if(latestOTP.otpToken==otp){
                    const token = jwtToken(check.user.email);
                    
                    if(user==null){
                        const newUser = {
                            "email": latestOTP.email,
                            "age": latestOTP.age,
                            "phone_number": latestOTP.phone_number
                        }
                        newUser.tokens.push({token})
                        user = new User(newUser);

                        await user.save();
                    }

                    await OTP.deleteMany({
                        phone_number:phone_number
                    })
                    user.tokens.push({token})
                    await user.save()
                    return res.status(200).send({
                        "code": 1,
                        "status": "Success!!",
                        "message": "OTP verified successfully!!",
                        "user": user
                    })
                }else{
                    return res.status(200).send({
                        "code": 0,
                        "status": "Error!!",
                        "message": "Invalid OTP!!",
                        "user": user
                    })
                }
            }else{
                return res.status(400).send({
                    "code": 0,
                    "status": "Error",
                    "message": "OTP expired!"
                })
            }
        }else{
            return res.status(400).send({
                "code": 0,
                "status": "Error",
                "message": "No such user found!!"
            })
        }
    }catch(err){
        return res.status(500).send({
            "code": 0,
            "status": "Failure",
            "message": err.toString()
        })
    }
}
    
module.exports = {authSignup, authLogin , authverify}