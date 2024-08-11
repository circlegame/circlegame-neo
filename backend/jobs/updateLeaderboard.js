const cron = require('node-cron');
const Score = require('../models/Score');
const Leaderboard = require('../models/Leaderboard');

const CRON_SCHEDULE = '*/1 * * * *';

// Gamemodes to keep a leaderboard for
const gamemodes = [
    'GridshotClassic',
    'GridshotMini',
    'GridshotWave',
    'CirclefallImpossible',
    'CirclefallMarathon'
]

const getAggregationPipeline = (gamemode) => [
    // Get all entries with matching gamemode
    {
      '$match': {
        'gamemode': gamemode
      }
    }, 
    // Group each entry the the max score for each username
    {
      '$group': {
        '_id': '$usernameDisplay', 
        'maxScore': {
          '$max': '$score'
        }
      }
    }, 
    // Sort the entries by the maxscore, descending order
    {
      '$sort': {
        'maxScore': -1
      }
    }, 
    // choose how to display the output entries (should match leaderboard model)
    {
      '$project': {
        '_id': 0, 
        'username': '$_id', 
        'score': '$maxScore'
      }
    }
]

const updateLeaderboardForGamemode = async (gamemode) => {
    try {
        // Get the leaderboard with the pipeline
        const aggregationPipeline = getAggregationPipeline(gamemode);
        const result = await Score.aggregate(aggregationPipeline);
        
        let currentLeaderboard = await Leaderboard.findOne({ gamemode });
        if (!currentLeaderboard) {
            currentLeaderboard = new Leaderboard({
                gamemode: gamemode,
                entries: result
            });
        }
        else{
            currentLeaderboard.entries = result;
        }

        currentLeaderboard.save()
    } catch (err) {
        console.error(`Error running leaderboard update job for ${gamemode}:`, err);
    }
}

// Define the cron job to run daily at midnight
cron.schedule(CRON_SCHEDULE, async () => {
    try {
        for (const gamemode of gamemodes) {
            await updateLeaderboardForGamemode(gamemode);
        }
        console.log('Leaderboard successfully updated at ' + new Date());
    } catch (err) {
        console.error('Error running leaderboard update job:', err);
    }
});