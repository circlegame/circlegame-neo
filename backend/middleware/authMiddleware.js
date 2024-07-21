const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        const user = await User.findById(req.userId);
        req.username = user.username;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};