const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    gamemode: {
        type: String,
        required: true,
        index: true
    },
    entries: [
        {
            username: {
                type: String,
                required: true,
                index: true
            },
            score: {
                type: Number,
                required: true,
            }
        }
    ]
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);