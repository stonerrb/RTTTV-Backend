const twilio = require('twilio');

function OTPverification(phone_number) {
  const accountSid = 'AC1e7684bbdf95602397ae0c8f3daf7d67';
  const authToken = '124ca3160cd9544ba2220a9c334ecb40';
  const twilioPhone = '+12017718274';
    
  const client = new twilio(accountSid, authToken);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhone,
      to: phone_number,
    })
    .then((message) => console.log(`OTP sent. SID: ${message.sid}`))
    .catch((error) => console.error(`Error sending OTP: ${error.message}`));

  return otp;
}

module.exports = {OTPverification}