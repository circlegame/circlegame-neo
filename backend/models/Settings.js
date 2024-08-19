const mongoose = require('mongoose');

const validHitSounds = [
        "bah.wav",
        "beow.wav",
        "bonk.wav",
        "clack.wav",
        "cling.wav",
        "cod.wav",
        "fing.wav",
        "pew.wav",
        "ping.wav",
        "plop.wav",
        "swich.wav",
        "tic.wav",
        "pop1.wav",
        "pop2.wav",
        "pop3.wav",
        "pop4.wav"
]

const SettingsSchema = new mongoose.Schema({
    hitSound: {
        type: String,
        enum: validHitSounds,
        default: "plop.wav"
    },
});

module.exports = SettingsSchema;