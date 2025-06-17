const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: String,
    date: Date,
    reason: String,
    status: { type: String, default: "pending" }
});
module.exports = mongoose.model('Appointment', AppointmentSchema);