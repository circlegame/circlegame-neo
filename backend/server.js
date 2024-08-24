const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config();

const corsOrigin = process.env.NODE_ENV === "prod" ? 'https://circlegame.net' : 'http://localhost:5000'
const corsOptions = {
    origin: corsOrigin,
    credentials: true
};

const app = express();
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));




// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/scores', require('./routes/scoreRoutes'));
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));



// The "catchall" handler: for any request that doesn't
// match one above, send back index.html.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/dist/index.html'));
});
 
// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Run Jobs
require('./jobs/updateLeaderboard');

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));