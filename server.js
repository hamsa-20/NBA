

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// NBA API endpoints
app.get('/api/games/today', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${today}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.NBA_API_KEY || 'your-api-key-here',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching today\'s games:', error);
        res.status(500).json({ 
            error: 'Failed to fetch games',
            message: error.message 
        });
    }
});

app.get('/api/games/live', async (req, res) => {
    try {
        const response = await fetch('https://api-nba-v1.p.rapidapi.com/games?live=all', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.NBA_API_KEY || 'your-api-key-here',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching live games:', error);
        res.status(500).json({ 
            error: 'Failed to fetch live games',
            message: error.message 
        });
    }
});

app.get('/api/standings', async (req, res) => {
    try {
        const currentSeason = new Date().getFullYear();
        const response = await fetch(`https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=${currentSeason}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.NBA_API_KEY || 'your-api-key-here',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching standings:', error);
        res.status(500).json({ 
            error: 'Failed to fetch standings',
            message: error.message 
        });
    }
});

app.get('/api/teams', async (req, res) => {
    try {
        const response = await fetch('https://api-nba-v1.p.rapidapi.com/teams', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.NBA_API_KEY || 'your-api-key-here',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ 
            error: 'Failed to fetch teams',
            message: error.message 
        });
    }
});

app.get('/api/players/search/:name', async (req, res) => {
    try {
        const playerName = req.params.name;
        const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players?search=${playerName}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.NBA_API_KEY || 'your-api-key-here',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error searching players:', error);
        res.status(500).json({ 
            error: 'Failed to search players',
            message: error.message 
        });
    }
});

// Mock data fallback endpoints (for testing without API key)
app.get('/api/mock/games', (req, res) => {
    const mockGames = {
        "response": [
            {
                "id": 1,
                "date": {
                    "start": new Date().toISOString(),
                    "end": null
                },
                "time": {
                    "current": "Q2 05:23",
                    "total": null
                },
                "status": {
                    "clock": "05:23",
                    "halftime": false,
                    "short": 2,
                    "long": "2nd Quarter"
                },
                "teams": {
                    "visitors": {
                        "id": 1,
                        "name": "Atlanta Hawks",
                        "nickname": "Hawks",
                        "code": "ATL",
                        "logo": "https://upload.wikimedia.org/wikipedia/en/2/28/Atlanta_Hawks_logo.svg"
                    },
                    "home": {
                        "id": 2,
                        "name": "Boston Celtics",
                        "nickname": "Celtics",
                        "code": "BOS",
                        "logo": "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg"
                    }
                },
                "scores": {
                    "visitors": {
                        "win": 15,
                        "loss": 12,
                        "series": {
                            "win": 0,
                            "loss": 0
                        },
                        "linescore": ["28", "15", "", ""],
                        "points": 43
                    },
                    "home": {
                        "win": 18,
                        "loss": 9,
                        "series": {
                            "win": 0,
                            "loss": 0
                        },
                        "linescore": ["22", "18", "", ""],
                        "points": 40
                    }
                }
            },
            {
                "id": 2,
                "date": {
                    "start": new Date(Date.now() + 3600000).toISOString(),
                    "end": null
                },
                "time": {
                    "current": null,
                    "total": null
                },
                "status": {
                    "clock": null,
                    "halftime": false,
                    "short": 1,
                    "long": "Scheduled"
                },
                "teams": {
                    "visitors": {
                        "id": 4,
                        "name": "Brooklyn Nets",
                        "nickname": "Nets",
                        "code": "BKN",
                        "logo": "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg"
                    },
                    "home": {
                        "id": 5,
                        "name": "Charlotte Hornets",
                        "nickname": "Hornets",
                        "code": "CHA",
                        "logo": "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg"
                    }
                },
                "scores": {
                    "visitors": {
                        "win": 12,
                        "loss": 15,
                        "series": {
                            "win": 0,
                            "loss": 0
                        },
                        "linescore": ["", "", "", ""],
                        "points": 0
                    },
                    "home": {
                        "win": 8,
                        "loss": 19,
                        "series": {
                            "win": 0,
                            "loss": 0
                        },
                        "linescore": ["", "", "", ""],
                        "points": 0
                    }
                }
            }
        ]
    };
    res.json(mockGames);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        message: `${req.method} ${req.path} is not a valid endpoint` 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🏀 NBA Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available:`);
    console.log(`   GET /api/games/today - Today's games`);
    console.log(`   GET /api/games/live - Live games`);
    console.log(`   GET /api/standings - League standings`);
    console.log(`   GET /api/teams - All teams`);
    console.log(`   GET /api/players/search/:name - Search players`);
    console.log(`   GET /api/mock/games - Mock data for testing`);
    console.log(`\n💡 Don't forget to set your NBA_API_KEY environment variable!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Server shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down gracefully...');
    process.exit(0);
});