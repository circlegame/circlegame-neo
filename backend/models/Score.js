const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    gamemode: {
        type: String,
        required: true,
        index: true
    },
    score: {
        type: Number,
        required: true
    },
    stats: {
        hits: {
            type: Number,
            required: true
        },
        misses: {
            type: Number,
            required: true
        },
        misclicks: {
            type: Number,
            required: true
        }
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('Score', scoreSchema);