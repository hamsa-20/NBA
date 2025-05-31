// class NBAApi {
//     constructor() {
//         // Using RapidAPI's NBA API (free tier available)
//         this.baseURL = 'https://api-nba-v1.p.rapidapi.com';
//         this.headers = {
//             'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY_HERE', // Replace with your actual key
//             'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
//         };
        
//         // Fallback to a demo mode if no API key
//         this.demoMode = this.headers['X-RapidAPI-Key'] === 'YOUR_RAPIDAPI_KEY_HERE';
//     }

//     async fetchWithTimeout(url, options = {}, timeout = 10000) {
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), timeout);
        
//         try {
//             const response = await fetch(url, {
//                 ...options,
//                 signal: controller.signal
//             });
//             clearTimeout(timeoutId);
            
//             if (!response.ok) {
//                 throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//             }
            
//             return await response.json();
//         } catch (error) {
//             clearTimeout(timeoutId);
//             if (error.name === 'AbortError') {
//                 throw new Error('Request timeout - API took too long to respond');
//             }
//             throw error;
//         }
//     }

//     async getUpcomingGames() {
//         if (this.demoMode) {
//             return this.getDemoData();
//         }

//         try {
//             // Get current season
//             const currentYear = new Date().getFullYear();
//             const season = new Date().getMonth() >= 9 ? currentYear : currentYear - 1;
            
//             // Fetch games for today and next few days
//             const today = new Date();
//             const endDate = new Date();
//             endDate.setDate(today.getDate() + 7); // Next 7 days
            
//             const url = `${this.baseURL}/games`;
//             const params = new URLSearchParams({
//                 season: season.toString(),
//                 date: today.toISOString().split('T')[0]
//             });

//             const response = await this.fetchWithTimeout(`${url}?${params}`, {
//                 headers: this.headers
//             });

//             return this.formatGamesData(response.response || []);
//         } catch (error) {
//             console.error('NBA API Error:', error);
//             throw new Error(`Failed to fetch NBA data: ${error.message}`);
//         }
//     }

//     formatGamesData(games) {
//         return games.map(game => ({
//             id: game.id,
//             date: game.date?.start || new Date().toISOString(),
//             status: game.status?.long || 'Scheduled',
//             homeTeam: {
//                 id: game.teams?.home?.id,
//                 name: game.teams?.home?.name || 'Home Team',
//                 city: game.teams?.home?.city || 'City',
//                 code: game.teams?.home?.code || 'HOM',
//                 logo: game.teams?.home?.logo
//             },
//             awayTeam: {
//                 id: game.teams?.away?.id,
//                 name: game.teams?.away?.name || 'Away Team',
//                 city: game.teams?.away?.city || 'City',
//                 code: game.teams?.away?.code || 'AWY',
//                 logo: game.teams?.away?.logo
//             },
//             venue: {
//                 name: game.arena?.name || 'TBA',
//                 city: game.arena?.city || 'TBA'
//             }
//         }));
//     }

//     getDemoData() {
//         // Demo data for when API key is not available
//         const today = new Date();
//         const tomorrow = new Date(today);
//         tomorrow.setDate(today.getDate() + 1);
        
//         const dayAfter = new Date(today);
//         dayAfter.setDate(today.getDate() + 2);

//         return Promise.resolve([
//             {
//                 id: 'demo-1',
//                 date: tomorrow.toISOString(),
//                 status: 'Scheduled',
//                 homeTeam: {
//                     id: 1,
//                     name: 'Lakers',
//                     city: 'Los Angeles',
//                     code: 'LAL',
//                     logo: null
//                 },
//                 awayTeam: {
//                     id: 2,
//                     name: 'Warriors',
//                     city: 'Golden State',
//                     code: 'GSW',
//                     logo: null
//                 },
//                 venue: {
//                     name: 'Crypto.com Arena',
//                     city: 'Los Angeles'
//                 }
//             },
//             {
//                 id: 'demo-2',
//                 date: tomorrow.toISOString(),
//                 status: 'Scheduled',
//                 homeTeam: {
//                     id: 3,
//                     name: 'Celtics',
//                     city: 'Boston',
//                     code: 'BOS',
//                     logo: null
//                 },
//                 awayTeam: {
//                     id: 4,
//                     name: 'Heat',
//                     city: 'Miami',
//                     code: 'MIA',
//                     logo: null
//                 },
//                 venue: {
//                     name: 'TD Garden',
//                     city: 'Boston'
//                 }
//             },
//             {
//                 id: 'demo-3',
//                 date: dayAfter.toISOString(),
//                 status: 'Scheduled',
//                 homeTeam: {
//                     id: 5,
//                     name: 'Mavericks',
//                     city: 'Dallas',
//                     code: 'DAL',
//                     logo: null
//                 },
//                 awayTeam: {
//                     id: 6,
//                     name: 'Nuggets',
//                     city: 'Denver',
//                     code: 'DEN',
//                     logo: null
//                 },
//                 venue: {
//                     name: 'American Airlines Center',
//                     city: 'Dallas'
//                 }
//             }
//         ]);
//     }
// }

// // Export for use in other files
// window.NBAApi = NBAApi;
class NBAAPI {
    constructor() {
        this.baseURL = 'https://api.balldontlie.io/v1';
        this.headers = {
            'Authorization': 'YOUR_API_KEY_HERE'
        };
    }

    async getGamesByDate(date) {
        try {
            const response = await fetch(`${this.baseURL}/games?dates[]=${date}`, {
                headers: this.headers
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            
            const data = await response.json();
            return this.transformGamesData(data.data);
        } catch (error) {
            console.error('API Error:', error);
            // Return mock data for demo purposes
            return this.getMockGames();
        }
    }

    transformGamesData(games) {
        return games.map(game => ({
            id: game.id,
            time: game.status === 'Final' ? 'Final' : game.time,
            status: this.getGameStatus(game.status),
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
    }

    getGameStatus(status) {
        if (status === 'Final') return 'FINAL';
        if (status.includes('Q') || status.includes('Half')) return 'LIVE';
        return 'SCHEDULED';
    }

    getMockGames() {
        return [
            {
                id: 1,
                time: '2024-01-15T20:00:00Z',
                status: 'LIVE',
                quarter: 3,
                timeRemaining: '8:45',
                homeTeam: {
                    id: 1,
                    name: 'Los Angeles Lakers',
                    abbreviation: 'LAL',
                    logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
                    score: 95
                },
                awayTeam: {
                    id: 2,
                    name: 'Boston Celtics',
                    abbreviation: 'BOS',
                    logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
                    score: 88
                }
            },
            {
                id: 2,
                time: '2024-01-15T22:30:00Z',
                status: 'SCHEDULED',
                homeTeam: {
                    id: 3,
                    name: 'Golden State Warriors',
                    abbreviation: 'GSW',
                    logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
                    score: null
                },
                awayTeam: {
                    id: 4,
                    name: 'Miami Heat',
                    abbreviation: 'MIA',
                    logo: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
                    score: null
                }
            },
            {
                id: 3,
                time: '2024-01-15T19:00:00Z',
                status: 'FINAL',
                homeTeam: {
                    id: 5,
                    name: 'Chicago Bulls',
                    abbreviation: 'CHI',
                    logo: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg',
                    score: 108
                },
                awayTeam: {
                    id: 6,
                    name: 'New York Knicks',
                    abbreviation: 'NYK',
                    logo: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg',
                    score: 112
                }
            }
        ];
    }
}