const express = require('express')
const router = new express.Router()
const User = new require('../models/user.js')

router.post('/signup', async (req, res)=>{
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
            //1. Call OTP function (which generate OTP) over here and save OTP token in User model over here
            //2. Sent OTP to email and phone number
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
    
})

router.post('/login', async (req, res)=>{
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
            //1. Call OTP function (which generate OTP) over here and save OTP token in User model over here
            //2. Sent OTP to email and phone number
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
})

router.post('/verify/:phone_number', async (req, res)=>{
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
            //Write logic of verification of OTP
            //Compare OTP stored in JWT token and entered OTP
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
})

module.exports = router