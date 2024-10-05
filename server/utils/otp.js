const otpGenerator = require('otp-generator');

async function generateOTP() {
    const otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });
    return otp;
}

function otpResolver(inputOtp, generatedOtp) {
    return inputOtp === generatedOtp;
}

module.exports = {
    generateOTP,
    otpResolver
};
