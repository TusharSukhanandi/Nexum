import nodemailer from "nodemailer";

const sendMail = async (email, otp) => {
  try{
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const receiver = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "OTP for your Nexum sign up",
    html: `
          <html>
            <body>
              <p>Hello,</p>
              <p>Thank you for joining Nexum!</p>
              <p>To verify your email, please use the One-Time Password (OTP) below:</p>
              <p style="font-size: 24px; font-weight: bold;">${otp}</p>
              <p>If you did not request this, please ignore this email.</p>
              <p>Best regards,</p>
              <p>The Nexum Team</p>
            </body>
          </html>
        `,
  };
 
  const isOtpSent = await transporter.sendMail(receiver)
  
    if(isOtpSent){
      return true
    }
  
  return false;
}
catch (error){
  console.log(error);
  
return false
}

}

export default sendMail;
