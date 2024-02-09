const twilio = require('twilio');
const jwt = require('jsonwebtoken');

async function OTPverification(phone_number) {

  if (!(phone_number && phone_number.length === 13 && phone_number.startsWith('+91'))) {
    return {
      "status": 0,
      "message": "Invalid phone number format. It must be of length 10 and start with '+91'."
    };
  }
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE;
    
  const client = new twilio(accountSid, authToken);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try{
    const message = await client.messages.create({
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
    console.log("Catch:::")
    console.log(err)
    return {
      "status": 0,
      "message": "Not able to send otp!!"
    }
  }
}

module.exports = {OTPverification}