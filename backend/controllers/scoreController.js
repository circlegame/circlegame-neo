const Score = require('../models/Score');

exports.submitScore = async (req, res) => {
    try {
        const { gamemode, score, stats} = req.body;
        const username = req.username;
        const usernameDisplay = req.usernameDisplay;
        // const userId = req.userId

        // Validation
        if (!username || !gamemode || score === undefined || stats === undefined || stats.hits === undefined || stats.misses === undefined || stats.misclicks === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const newScore = new Score({
            username: username,
            usernameDisplay: usernameDisplay,
            gamemode: gamemode,
            score: score,
            stats: stats
        });
        await newScore.save();
        res.status(201).json({ message: 'Score submitted'});
    } catch (err) {
        res.status(500).json({ message: 'Score submission failed'})
    }
}

exports.getScoresByUsername = async (req, res) => {
    try{
        const { username } = req.params;

        // Find scores by username
        const scores = await Score.find({ username: username }).select('-_id -__v -username -usernameDisplay');

        res.status(200).json(scores);
    } catch (err) {
        res.status(500).json({message: 'Falied getting scores'})
    }
}