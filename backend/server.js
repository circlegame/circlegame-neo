const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const corsOptions = {
    //origin: 'https://circlegame.github.io',
    origin: 'http://localhost:5173',
    credentials: true
};

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/scores', require('./routes/scoreRoutes'));
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Run Jobs
require('./jobs/updateLeaderboard');

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));