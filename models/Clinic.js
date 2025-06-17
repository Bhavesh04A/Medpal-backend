const mongoose = require('mongoose');
const ClinicSchema = new mongoose.Schema({
    name: String,
    address: String,
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number], // [longitude, latitude]
    }
});
ClinicSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Clinic', ClinicSchema);