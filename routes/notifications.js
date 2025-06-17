const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

router.get('/', auth, async(req, res) => {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
});

router.post('/', auth, async(req, res) => {
    const { message } = req.body;
    const notification = new Notification({ user: req.user.id, message });
    await notification.save();
    res.json(notification);
});

router.put('/:id/read', auth, async(req, res) => {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
});

module.exports = router;