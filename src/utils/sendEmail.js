const nodemailer = require("nodemailer");
require('dotenv').config();
const sendEmail = async (options) => {
  // 1. إعداد الـ Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. إعداد الرسالة
  const mailOptions = {
    from: `My Ecommerce Store <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // 3. الإرسال الفعلي
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
