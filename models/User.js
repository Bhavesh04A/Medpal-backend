const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    profilePic: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('User', UserSchema);