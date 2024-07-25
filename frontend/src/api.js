import axios from 'axios';

const API = axios.create({ 
    baseURL: 'http://localhost:5000/api', 
    withCredentials: true 
});

// Register user
export const register = (email, username, password) => API.post(
    '/auth/register', 
    {
        email: email,
        username: username,
        password: password
    }
);

// Login user
export const login = (identifier, password) => API.post(
    '/auth/login',
    {
        identifier: identifier,
        password: password
    }
);

// Submit score
export const submitScore = (gamemode, score, hits, misses, misclicks) => API.post(
    '/scores/submit',
    {
        gamemode: gamemode,
        score: score,
        stats: {
            hits: hits,
            misses: misses,
            misclicks: misclicks
        }
    }
)

// Get scores by username
export const getScoreByUsername = (username) => API.get('/scores/username/' + username);

// Get leaderboard
export const getLeaderboard = (gamemode) => API.get('/leaderboard/gamemode/' + gamemode);