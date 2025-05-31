// class NBAMatchesApp {
//     constructor() {
//         this.api = new NBAApi();
//         this.matches = [];
//         this.isLoading = false;
        
//         this.initializeElements();
//         this.loadMatches();
//     }

//     initializeElements() {
//         this.elements = {
//             loading: document.getElementById('loading'),
//             errorContainer: document.getElementById('error-container'),
//             errorMessage: document.getElementById('error-message'),
//             matchesSection: document.getElementById('matches-section'),
//             matchesContainer: document.getElementById('matches-container'),
//             matchesCount: document.getElementById('matches-count'),
//             noMatches: document.getElementById('no-matches'),
//             refreshBtn: document.getElementById('refresh-btn'),
//             refreshText: document.getElementById('refresh-text'),
//             refreshSpinner: document.getElementById('refresh-spinner')
//         };
//     }

//     async loadMatches() {
//         if (this.isLoading) return;
        
//         this.isLoading = true;
//         this.showLoading();
        
//         try {
//             this.matches = await this.api.getUpcomingGames();
//             this.displayMatches();
//         } catch (error) {
//             console.error('Error loading matches:', error);
//             this.showError(error.message);
//         } finally {
//             this.isLoading = false;
//             this.hideLoading();
//         }
//     }

//     showLoading() {
//         this.elements.loading.style.display = 'block';
//         this.elements.errorContainer.style.display = 'none';
//         this.elements.matchesSection.style.display = 'none';
        
//         // Update refresh button
//         this.elements.refreshText.textContent = 'Loading...';
//         this.elements.refreshSpinner.style.display = 'inline-block';
//         this.elements.refreshBtn.disabled = true;
//     }

//     hideLoading() {
//         this.elements.loading.style.display = 'none';
        
//         // Reset refresh button
//         this.elements.refreshText.textContent = 'Refresh';
//         this.elements.refreshSpinner.style.display = 'none';
//         this.elements.refreshBtn.disabled = false;
//     }

//     showError(message) {
//         this.elements.errorContainer.style.display = 'block';
//         this.elements.errorMessage.textContent = message;
//         this.elements.matchesSection.style.display = 'none';
//     }

//     displayMatches() {
//         this.elements.errorContainer.style.display = 'none';
//         this.elements.matchesSection.style.display = 'block';
        
//         if (this.matches.length === 0) {
//             this.elements.noMatches.style.display = 'block';
//             this.elements.matchesContainer.style.display = 'none';
//             this.elements.matchesCount.textContent = 'No games found';
//             return;
//         }

//         this.elements.noMatches.style.display = 'none';
//         this.elements.matchesContainer.style.display = 'grid';
//         this.elements.matchesCount.textContent = `${this.matches.length} game${this.matches.length !== 1 ? 's' : ''} found`;
        
//         // Sort matches by date
//         this.matches.sort((a, b) => new Date(a.date) - new Date(b.date));
        
//         // Clear container and add matches
//         this.elements.matchesContainer.innerHTML = '';
//         this.matches.forEach(match => {
//             const matchCard = this.createMatchCard(match);
//             this.elements.matchesContainer.appendChild(matchCard);
//         });
//     }

//     createMatchCard(match) {
//         const card = document.createElement('div');
//         card.className = 'match-card';
        
//         const matchDate = new Date(match.date);
//         const isToday = this.isToday(matchDate);
//         const isTomorrow = this.isTomorrow(matchDate);
        
//         let dateText = matchDate.toLocaleDateString('en-US', {
//             weekday: 'short',
//             month: 'short',
//             day: 'numeric'
//         });
        
//         if (isToday) dateText = 'Today';
//         else if (isTomorrow) dateText = 'Tomorrow';
        
//         const timeText = matchDate.toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true
//         });

//         card.innerHTML = `
//             <div class="match-header">
//                 <div class="match-status">${match.status}</div>
//                 <div class="match-date-time">
//                     <div class="match-date">${dateText}</div>
//                     <div class="match-time">${timeText}</div>
//                 </div>
//             </div>
            
//             <div class="teams-container">
//                 <div class="team">
//                     <div class="team-logo">${match.awayTeam.code}</div>
//                     <div class="team-name">${match.awayTeam.name}</div>
//                     <div class="team-city">${match.awayTeam.city}</div>
//                 </div>
                
//                 <div class="vs-divider">VS</div>
                
//                 <div class="team">
//                     <div class="team-logo">${match.homeTeam.code}</div>
//                     <div class="team-name">${match.homeTeam.name}</div>
//                     <div class="team-city">${match.homeTeam.city}</div>
//                 </div>
//             </div>
            
//             <div class="match-details">
//                 <div class="detail-item">
//                     <span class="detail-icon">🏟️</span>
//                     <span>${match.venue.name}</span>
//                 </div>
//                 <div class="detail-item">
//                     <span class="detail-icon">📍</span>
//                     <span>${match.venue.city}</span>
//                 </div>
//             </div>
//         `;
        
//         return card;
//     }

//     isToday(date) {
//         const today = new Date();
//         return date.toDateString() === today.toDateString();
//     }

//     isTomorrow(date) {
//         const tomorrow = new Date();
//         tomorrow.setDate(tomorrow.getDate() + 1);
//         return date.toDateString() === tomorrow.toDateString();
//     }

//     async refresh() {
//         await this.loadMatches();
//     }
// }

// // Global refresh function
// function refreshMatches() {
//     if (window.nbaApp) {
//         window.nbaApp.refresh();
//     }
// }

// // Initialize app when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     window.nbaApp = new NBAMatchesApp();
// });
class NBAApp {
    constructor() {
        this.api = new NBAAPI();
        this.currentGames = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTodaysGames();
    }

    bindEvents() {
        document.getElementById('refresh-btn').addEventListener('click', () => this.loadTodaysGames());
        document.getElementById('prev-day').addEventListener('click', () => this.changeDate(-1));
        document.getElementById('next-day').addEventListener('click', () => this.changeDate(1));
        document.getElementById('live-toggle').addEventListener('change', (e) => this.toggleLiveGames(e.target.checked));
    }

    async loadTodaysGames() {
        this.showLoading(true);
        try {
            const today = new Date().toISOString().split('T')[0];
            this.currentGames = await this.api.getGamesByDate(today);
            this.renderGames();
            document.getElementById('current-date').textContent = this.formatDate(today);
        } catch (error) {
            this.showError('Failed to load games');
        } finally {
            this.showLoading(false);
        }
    }

    async changeDate(days) {
        const currentDate = new Date(document.getElementById('current-date').textContent);
        currentDate.setDate(currentDate.getDate() + days);
        const dateString = currentDate.toISOString().split('T')[0];
        
        this.showLoading(true);
        try {
            this.currentGames = await this.api.getGamesByDate(dateString);
            this.renderGames();
            document.getElementById('current-date').textContent = this.formatDate(dateString);
        } catch (error) {
            this.showError('Failed to load games');
        } finally {
            this.showLoading(false);
        }
    }

    toggleLiveGames(showLiveOnly) {
        const games = showLiveOnly ? 
            this.currentGames.filter(game => game.status === 'LIVE') : 
            this.currentGames;
        this.renderGames(games);
    }

    renderGames(games = this.currentGames) {
        const container = document.getElementById('games-container');
        
        if (games.length === 0) {
            container.innerHTML = '<div class="no-games">No games scheduled for this date</div>';
            return;
        }

        container.innerHTML = games.map(game => this.createGameCard(game)).join('');
    }

    createGameCard(game) {
        const statusClass = game.status === 'LIVE' ? 'live' : 
                           game.status === 'FINAL' ? 'final' : 'scheduled';
        
        return `
            <div class="game-card ${statusClass}">
                <div class="game-header">
                    <span class="game-time">${this.formatTime(game.time)}</span>
                    <span class="game-status ${statusClass}">${game.status}</span>
                </div>
                <div class="teams">
                    <div class="team away">
                        <img src="${game.awayTeam.logo}" alt="${game.awayTeam.name}" class="team-logo">
                        <span class="team-name">${game.awayTeam.name}</span>
                        <span class="team-score">${game.awayTeam.score || '-'}</span>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team home">
                        <img src="${game.homeTeam.logo}" alt="${game.homeTeam.name}" class="team-logo">
                        <span class="team-name">${game.homeTeam.name}</span>
                        <span class="team-score">${game.homeTeam.score || '-'}</span>
                    </div>
                </div>
                ${game.status === 'LIVE' ? `
                    <div class="game-details">
                        <span class="quarter">Q${game.quarter}</span>
                        <span class="time-remaining">${game.timeRemaining}</span>
                    </div>
                ` : ''}
            </div>
        `;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatTime(timeString) {
        return new Date(timeString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    showLoading(show) {
        document.getElementById('loading').style.display = show ? 'block' : 'none';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NBAApp();
});