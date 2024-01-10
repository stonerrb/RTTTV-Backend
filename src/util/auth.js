const twilio = require('twilio');
const jwt = require('jsonwebtoken');
require('dotenv').config()

function OTPverification(phone_number) {

  if (!(phone_number && phone_number.length === 13 && phone_number.startsWith('+91'))) {
    return {
      "status": 0,
      "message": "Invalid phone number format. It must be of length 10 and start with '+91'."
    };
  }

  const accountSid = 'AC1e7684bbdf95602397ae0c8f3daf7d67';
  const authToken = 'ee2ce97ff559284be1c64a0a8dcdf82b';
  const twilioPhone = '+12017718274';
    
  const client = new twilio(accountSid, authToken);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try{
    const message = client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhone,
      to: phone_number,
    })

    console.log("Message:::")
    return {
      "status": 1,
      "message": "Success!!",
      "otp": otp
    }

  }catch(err){
    return {
      "status": 0,
      "message": "Not able to send otp!!"
    }
  }
}

module.exports = {OTPverification}