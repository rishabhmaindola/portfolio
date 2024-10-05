const nodemailer = require('nodemailer');
require('dotenv').config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
});

function sendEmail(target, otp) {
    const mailOptions = {
        from: email,
        to: target,
        subject: 'OTP verification',
        text: `Your OTP is: ${otp}`,
        html: `<p>Your OTP is: <strong>${otp}</strong></p>`
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending OTP to email:', err);
                reject({ success: false, message: 'Error sending OTP' });
            } else {
                console.log('Email sent:', info.response);
                resolve({ success: true, message: 'OTP sent successfully' });
            }
        });
    });
}

module.exports = {
    sendEmail
};
