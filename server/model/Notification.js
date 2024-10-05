const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
