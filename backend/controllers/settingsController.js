const User = require('../models/User');

exports.updateSetting = async (req, res) => {
    try {
        const { settingName, settingValue } = req.body;
        const userId = req.userId;

        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $set: { [`settings.${settingName}`]: settingValue} },
            { new: true }
        );

        res.status(200).json({ message: 'Settings Update Success'});
    } catch(err){
        res.status(500).json({ message: 'Settings Update Failed'});
    }
}

exports.getSettingsByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        // Find the user by username and select the settings field only
        const user = await User.findOne({ username }).select('settings');

        if (!user) {
            return res.status(404).json({ message: 'Error retrieving user settings' });
        }

        // Respond with the user's settings
        res.status(200).json(user.settings);
    } catch (err) {
        // Handle any errors
        res.status(500).json({ message: 'Error retrieving user settings'});
    }
};