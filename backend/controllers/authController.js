const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Need to add data validation
        //
        //

        // Check if username already exists
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername){
            return res.status(400).json({ message: 'Username already in use' });
        }
        
        // Check if email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail){
            return res.status(400).json({ message: 'Email already in use' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store the data
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        await user.save();
        
        // Send response
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // Identifier can either be username or email
        // Need to add data validation
        //
        //

        // Find user in database
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Create and return authorization token
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict' // Help mitigate CSRF attacks
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict' // Help mitigate CSRF attacks
        });
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.refresh = (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        // Verify and decode refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        // Create new access token
        const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Create and set a new refresh token
        const newRefreshToken = jwt.sign({ userId: decoded.userId }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

        // Set new cookies
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        res.json({ message: 'Token refreshed' });
    } catch (err) {
        res.status(401).json({ message: 'Refresh token is expired or invalid' });
    }
}

exports.logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.json({ message: 'Logged out successfully' });
}