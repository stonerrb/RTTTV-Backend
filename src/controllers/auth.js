const User = new require('../models/user.js')

const {OTPverification} = require('../util/auth.js')

const authSignup = async (req, res)=>{
    console.log("Signup Page:::")
    const {phone_number, age, email, password} = req.body;
    if(req.body==null || phone_number==null || age==null || email==null || password==null){
        res.status(400).send({
            "code": 0,
            "status": "Error",
            "message": "Enter valid details!!"
        })
    }
    
    try{
        const user = await User.findOne({phone_number})

        if(user==null){
            const newUser = User(req.body)

            const otpToken = OTPverification(phone_number);

            newUser.otpToken = otpToken;

            await newUser.save()

            return res.status(200).send({
                "code": 1,
                "status": "Success",
                "message": "OTP sent successfully to Email and Phone No.",
                "user": newUser
            })
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

    const {phone_number, email, password} = req.body;
    if(req.body==null || phone_number==null || email==null || password==null){
        res.status(400).send({
            "code": 0,
            "status": "Error",
            "message": "Enter valid details!!"
        })
    }

    try{
        const check = await User.matchCredentials(email,phone_number, password);
        if(check.status==1){

            return res.status(200).send({
                "code": 1,
                "status": "Success!!",
                "message": "OTP sent successfully to Email and Phone No.",
                "user": check.user
            })
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
        const user = await User.findOne({phone_number: phone_number})
        if(user!=null){
            if(user.otpToken==otp){

                user.otpToken = null;
                
                return res.status(200).send({
                    "code": 1,
                    "status": "Success!!",
                    "message": "OTP verified successfully!!",
                    "user": user
                })
            }
        }
        res.status(400).send({
            "code": 0,
            "status": "Error",
            "message": "No such user found!!"
        })
    }catch(err){
        return res.status(500).send({
            "code": 0,
            "status": "Failure",
            "message": err.toString()
        })
    }
}
    
module.exports = {authSignup, authLogin , authverify}