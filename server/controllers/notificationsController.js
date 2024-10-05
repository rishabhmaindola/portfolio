const Notification = require('../model/Notification');

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json({
            success: true,
            message: 'Notifications fetched successfully',
            data: { notifications }
        });
        console.log('All notifications fetched');
    } catch (err) {
        console.error('Error fetching notifications:', err.message);
        res.status(500).json({ success: false, message: 'Error fetching notifications' });
    }
};