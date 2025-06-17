const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /api/profile/upload
router.post('/upload', auth, async(req, res) => {
    try {
        if (!req.files || !req.files.profilePic) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.files.profilePic;
        const user = await User.findByIdAndUpdate(
            req.user.id, {
                profilePic: {
                    data: file.data,
                    contentType: file.mimetype
                }
            }, { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error('Image upload failed:', err);
        res.status(500).json({ error: 'Image upload failed' });
    }
});

// GET /api/profile/image/:userId
router.get('/image/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('profilePic');

        if (!user || !user.profilePic || !user.profilePic.data) {
            return res.status(404).send('Image not found');
        }

        res.set('Content-Type', user.profilePic.contentType);
        res.send(user.profilePic.data);
    } catch (error) {
        res.status(500).send('Error fetching image');
    }
});

// GET /api/profile (Get current user's profile)
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// PUT /api/profile (Update name/phone)
router.put('/', auth, async(req, res) => {
    const { name, phone } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id, { name, phone }, { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Profile update failed' });
    }
});

module.exports = router;