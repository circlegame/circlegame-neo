const express = require('express');
const { submitScore, getScoresByUsername } = require('../controllers/scoreController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

//router.use(authMiddleware)

router.post('/submit', authMiddleware, submitScore);
router.get('/username/:username', getScoresByUsername);

module.exports = router;