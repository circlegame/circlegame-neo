const express = require('express');
const { updateSetting, getSettingsByUsername } = require('../controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/update', authMiddleware, updateSetting);
router.get('/username/:username', getSettingsByUsername);

module.exports = router;