const Form = require('../model/Form')
const { generateOTP } = require('../utils/otp')
const { sendEmail } = require('../utils/mailer')

const otpStore = {};

exports.generateOtp = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' })
    }

    try {
        const otp = await generateOTP()
        otpStore[email] = otp

        const response = await sendEmail(email, otp)
        console.log(response)

        return res.status(200).json({ 'message': response })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'An error occurred while sending the OTP' })
    }
}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const { form } = req.body
    console.log(email, otp)
    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const storedOtp = otpStore[email];
    if (!storedOtp) {
        return res.status(207).json({ success: false, message: 'No OTP found for this email' });
    }

    if (storedOtp === otp) {
        delete otpStore[email];

        const newForm = new Form({
            name: form.name,
            email: form.email,
            message: form.message
        });

        try {
            await newForm.save();
            res.status(201).json({ success: true, message: 'OTP verified successfully! Form saved.', data: newForm });
            console.log('New form received:', form);
        } catch (error) {
            console.error('Error saving the form:', error.message);
            return res.status(500).json({ success: false, message: 'Error saving the form in the database.' });
        }
    } else {
        return res.status(400).json({ success: false, message: 'Wrong OTP, try again.' });
    }
}