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
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict' // Help mitigate CSRF attacks
        });

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};