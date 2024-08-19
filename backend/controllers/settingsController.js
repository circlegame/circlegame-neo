const User = require('../models/User');

exports.updateSetting = async (req, res) => {
    try {
        const { settingName, settingValue } = req.body;
        const userId = req.userId;

        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $set: { [settingName]: settingValue} },
            { new: true }
        );
        res.status(200).json({ message: 'Settings Update Success'});
    } catch(err){
        res.status(500).json({ message: 'Settings Update Failed'});
    }
}