const Score = require('../models/Score');

exports.submitScore = async (req, res) => {
    try {
        const { gamemode, score, stats} = req.body;
        const username = req.username;
        // const userId = req.userId

        // Validation
        if (!username || !gamemode || score === undefined || stats === undefined || stats.hits === undefined || stats.misses === undefined || stats.misclicks === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const newScore = new Score({
            username: username,
            gamemode: gamemode,
            score: score,
            stats: stats
        });
        await newScore.save();
        res.status(201).json({ message: 'Score submitted'});
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getScoreByUsername = async (req, res) => {
    try{
        const { username } = req.params;

        // Find scores by username
        const scores = await Score.find({ username: username });

        // Check if scores were found
        if (!scores.length) {
            return res.status(404).json({ message: 'No scores found for this username' });
        }

        res.status(200).json(scores);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}