const mongoose = require('mongoose');
const SettingsSchema = require('./Settings');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    usernameDisplay: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    settings: {
        type: SettingsSchema,
        default: () => ({})
    },
});

module.exports = mongoose.model('User', userSchema);