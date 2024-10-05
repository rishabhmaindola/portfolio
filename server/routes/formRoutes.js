const express = require('express')
const router = express.Router()
const formController = require('../controllers/formController')

router.post('/otp/generate', formController.generateOtp)
router.post('/otp/verify', formController.verifyOtp)
// router.post('/form', formController)

module.exports = router