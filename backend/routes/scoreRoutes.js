const express = require('express');
const { submitScore, getScoreByUsername } = require('../controllers/scoreController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware)

router.post('/submit', submitScore);
router.get('/username/:username', getScoreByUsername);

module.exports = router;