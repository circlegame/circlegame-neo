const express = require('express');
const { updateSetting } = require('../controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/update', authMiddleware, updateSetting);

module.exports = router;