const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
    try{
        const { gamemode } = req.params;

        const leaderboard = await Leaderboard.findOne({ gamemode: gamemode });

        const leaderboardEntries = leaderboard.entries;

        res.status(200).json(leaderboardEntries);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}