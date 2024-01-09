const twilio = require('twilio');

function OTPverification(phone_number) {
  const accountSid = 'AC1e7684bbdf95602397ae0c8f3daf7d67';
  const authToken = '124ca3160cd9544ba2220a9c334ecb40';
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
    if(message.status=="200"||message.status=="201"){
      return {
        "status": 1,
        "message": "Success!!",
        "otp": otp
      }
    }else{
      return {
        "status": 0,
        "message": "Not able to send otp!!"
      }
    }

  }catch(err){
    return {
      "status": 0,
      "message": "Not able to send otp!!"
    }
  }
}

module.exports = {OTPverification}