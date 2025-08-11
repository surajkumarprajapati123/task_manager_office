const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();


const SendOnlyEmailForgate = async (email, token) => {
  try {
    const resetPasswordLink = `
http://localhost:5173/forgot-password/${token}`;
    const templtepath = path.join(__dirname, "../views/ForgatePassword.ejs");
    const data = await ejs.renderFile(templtepath, { resetPasswordLink });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      // secure: true, // use SSL
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: data,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// console.log(data);

module.exports = {

  SendOnlyEmailForgate,
  
};

// GeneratorOtp("surajkumar@gmaml.com");