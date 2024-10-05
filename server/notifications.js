const EventEmitter = require('events');
const Notification = require('./model/Notification');

class NotificationEmitter extends EventEmitter { }
const notification = new NotificationEmitter();

notification.on('createBlog', async (title, description) => {
    const body = `New blog created: ${title}`;

    const newNotification = new Notification({ body });
    await newNotification.save();

    console.log(`New blog created: ${title} - ${description}`);
});

module.exports = {
    notification
};