 🏀 NBA Live Scores & Stats App
A full-stack NBA application providing real-time scores, team standings, player statistics, and game schedules with a modern, responsive interface.
🚀 Features

Live Game Scores - Real-time NBA game updates
Team Standings - Current season standings for both conferences
Player Statistics - Detailed player stats and performance metrics
Game Schedule - Upcoming and past game schedules
Responsive Design - Works perfectly on desktop and mobile
Multiple API Options - Flexible API integration with fallback options

📋 Prerequisites

Node.js (v14 or higher)
npm or yarn package manager
API key (for production use)



🌐 API Options & Setup
🏆 Option 1: RapidAPI - API-NBA (Recommended)
Best for production use with reliable data and rate limits
Setup:

Visit API-NBA on RapidAPI
Copy your API key
Add to .env: NBA_API_KEY=your_key_here

Base URL: https://api-nba-v1.p.rapidapi.com

🛠️ Installation

Clone the repository

bashgit clone <your-repo-url>
cd nba-app

Install dependencies

bashnpm install

Environment Setup

bash# Copy environment template
cp .env.example .env

# Add your API configuration
nano .env

Start the application

bash# Development mode
npm run dev

# Production mode
npm start
🔧 Environment Configuration
Create a .env file in the root directory: