const express = require('express');
const axios = require('axios');
const router = express.Router();

const NBA_API_BASE = 'https://api.balldontlie.io/v1';
const API_KEY = process.env.NBA_API_KEY;

// Middleware to add API key to headers
const addApiKey = (req, res, next) => {
    if (API_KEY) {
        req.headers['Authorization'] = API_KEY;
    }
    next();
};

// Get games by date
router.get('/games/:date', addApiKey, async (req, res) => {
    try {
        const { date } = req.params;
        const response = await axios.get(`${NBA_API_BASE}/games`, {
            params: { 'dates[]': date },
            headers: req.headers['Authorization'] ? { 'Authorization': req.headers['Authorization'] } : {}
        });

        const transformedGames = response.data.data.map(game => ({
            id: game.id,
            date: game.date,
            time: game.status === 'Final' ? 'Final' : game.time,
            status: getGameStatus(game.status),
            quarter: game.period || null,
            timeRemaining: game.time || null,
            homeTeam: {
                id: game.home_team.id,
                name: game.home_team.full_name,
                abbreviation: game.home_team.abbreviation,
                logo: `https://cdn.nba.com/logos/nba/${game.home_team.id}/global/L/logo.svg`,
                score: game.home_team_score
            },
            awayTeam: {
                id: game.visitor_team.id,
                name: game.visitor_team.full_name,
                abbreviation: game.visitor_team.abbreviation,
                logo: `https://cdn.nba.com/logos/nba/${game.visitor_team.id}/global/L/logo.svg`,
                score: game.visitor_team_score
            }
        }));

        res.json({
            success: true,
            data: transformedGames,
            count: transformedGames.length
        });
    } catch (error) {
        console.error('NBA API Error:', error.message);
        
        // Return mock data if API fails
        res.json({
            success: true,
            data: getMockGames(),
            count: 3,
            note: 'Using mock data - API unavailable'
        });
    }
});

// Get live games
router.get('/games/live', addApiKey, async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`${NBA_API_BASE}/games`, {
            params: { 'dates[]': today },
            headers: req.headers['Authorization'] ? { 'Authorization': req.headers['Authorization'] } : {}
        });

        const liveGames = response.data.data.filter(game => 
            getGameStatus(game.status) === 'LIVE'
        );

        res.json({
            success: true,
            data: liveGames,
            count: liveGames.length
        });
    } catch (error) {
        console.error('NBA API Error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch live games'
        });
    }
});

// Get team information
router.get('/teams', addApiKey, async (req, res) => {
    try {
        const response = await axios.get(`${NBA_API_BASE}/teams`, {
            headers: req.headers['Authorization'] ? { 'Authorization': req.headers['Authorization'] } : {}
        });

        res.json({
            success: true,
            data: response.data.data,
            count: response.data.data.length
        });
    } catch (error) {
        console.error('NBA API Error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch teams'
        });
    }
});

// Helper function to determine game status
function getGameStatus(status) {
    if (status === 'Final') return 'FINAL';
    if (status.includes('Q') || status.includes('Half') || status.includes('OT')) return 'LIVE';
    return 'SCHEDULED';
}

// Mock data for when API is unavailable
function getMockGames() {
    return [
        {
            id: 1,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toISOString(),
            status: 'LIVE',
            quarter: 3,
            timeRemaining: '8:45',
            homeTeam: {
                id: 1610612747,
                name: 'Los Angeles Lakers',
                abbreviation: 'LAL',
                logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
                score: 95
            },
            awayTeam: {
                id: 1610612738,
                name: 'Boston Celtics',
                abbreviation: 'BOS',
                logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
                score: 88
            }
        },
        {
            id: 2,
            date: new Date().toISOString().split('T')[0],
            time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            status: 'SCHEDULED',
            homeTeam: {
                id: 1610612744,
                name: 'Golden State Warriors',
                abbreviation: 'GSW',
                logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
                score: null
            },
            awayTeam: {
                id: 1610612748,
                name: 'Miami Heat',
                abbreviation: 'MIA',
                logo: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
                score: null
            }
        }
    ];
}

module.exports = router;