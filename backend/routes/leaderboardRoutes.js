const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const router = express.Router();

router.post('/gamemode', getLeaderboard);

module.exports = router;