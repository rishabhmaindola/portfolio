const Admin = require('../model/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createAdmin = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        
        const existingAdmin = await Admin.findOne({});
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: 'An admin already exists. Only one admin is allowed.' });
        }

        const adminWithEmail = await Admin.findOne({ email });
        if (adminWithEmail) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        console.log(newAdmin)
        res.status(201).json({ success: true, message: 'Admin created successfully' });
    } catch (err) {
        console.error('Error creating admin:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, message: 'Login successful', token, user: admin });
    } catch (err) {
        console.error('Error logging in:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
