const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// Create
router.post('/', auth, async(req, res) => {
    const { doctor, date, reason } = req.body;
    if (!doctor || !date || !reason) {
        return res.status(400).json({ error: "All fields are required." });
    }
    const appointment = new Appointment({ user: req.user.id, doctor, date, reason });
    await appointment.save();
    res.json(appointment);
});

// Read (all for user)
router.get('/', auth, async(req, res) => {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
});

// Update
router.put('/:id', auth, async(req, res) => {
    const { doctor, date, reason, status } = req.body;
    const appointment = await Appointment.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { doctor, date, reason, status }, { new: true });
    if (!appointment) return res.status(404).json({ error: "Not found" });
    res.json(appointment);
});

// Delete
router.delete('/:id', auth, async(req, res) => {
    const result = await Appointment.deleteOne({ _id: req.params.id, user: req.user.id });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
});

module.exports = router;