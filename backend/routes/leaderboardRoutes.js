const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const router = express.Router();

router.get('/gamemode/:gamemode', getLeaderboard);

module.exports = router;