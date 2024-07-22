const Leaderboard = require('../models/leaderboard');

exports.getLeaderboard = async (req, res) => {
    try{
        const { gamemode } = req.body;

        const leaderboard = await Leaderboard.find({ gamemode: gamemode });

        const leaderboardEntries = leaderboard.entries;

        res.status(200).json(leaderboardEntries);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}