const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ------ Utility ------- //

// Email validity
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}

// Username validity
const isValidUsername = (username) => {
    const usernameRegex = /^(?!.*[_.-]{2})[a-zA-Z0-9._-]{3,20}$/;
    return usernameRegex.test(username);
};


exports.register = async (req, res) => {
    try {
        // Get info from body
        const { username, email, password } = req.body;

        // Check if username is valid
        if (!isValidUsername(username)){
            return res.status(400).json({ message: 'Invalid username format' });
        }

        // Check if email is a valid format
        if (!isValidEmail(email)){
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if username already exists
        const existingUserByUsername = await User.findOne({ username: username.toLowerCase() });
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
            username: username.toLowerCase(),
            usernameDisplay: username,
            email: email.toLowerCase(),
            password: hashedPassword
        });
        await user.save();
        
        // Send response
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // Identifier can either be username or email
        
        if (!identifier || !password) {
            return res.status(400).json({ message: 'Please provide both identifier and password' });
        }

        let query;
        if (isValidEmail(identifier)) {
            query = { email: identifier.toLowerCase() };
        } else if (isValidUsername(identifier)) {
            query = { username: identifier.toLowerCase() };
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Find user in database
        const user = await User.findOne(query);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update the dateLastLoggedIn field to the current date and time
        user.dateLastLoggedIn = new Date();
        await user.save();
        
        // Create and return authorization token
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, //process.env.NODE_ENV === 'production'
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, //process.env.NODE_ENV === 'production',
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        return res.status(200).json({ 
            message: 'Logged in successfully',
            usernameDisplay: user.usernameDisplay
        });
    } catch (err) {
        res.status(500).json({ message: 'Login failed' });
    }
};

exports.refresh = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        // Verify and decode refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        // Fetch user from data base to return display name
        const user = await User.findById(decoded.userId);

        if (!user){
            return res.status(401).json({ message: 'User not found' });
        }

        // Update the dateLastLoggedIn field to the current date and time
        user.dateLastLoggedIn = new Date();
        await user.save();

        // Create new access token
        const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Create and set a new refresh token
        const newRefreshToken = jwt.sign({ userId: decoded.userId }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

        // Set new cookies
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(200).json({ 
            message: 'Token refreshed',
            usernameDisplay: user.usernameDisplay
        });
    } catch (err) {
        res.status(401).json({ message: 'Refresh token is expired or invalid' });
    }
}

exports.logout = (req, res) => {
    try {
        // Clear cookies with the same options as when they were set
        res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });

        // Respond with a success message
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        // Handle any errors that may occur
        res.status(500).json({ message: 'Logout failed'});
    }
}