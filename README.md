 NBA Upcoming Matches
A modern, responsive web application that displays upcoming NBA basketball matches using live data from the Ball Don't Lie NBA API.
✨ Features

Live NBA Data: Fetches real-time upcoming match data
Modern UI: Glassmorphism design with smooth animations
Responsive: Works perfectly on desktop, tablet, and mobile
Error Handling: Graceful fallback with sample data
Fast Loading: Optimized performance with loading states
No Dependencies: Pure HTML, CSS, and JavaScript

🚀 Quick Start

Download all project files
Open index.html in any modern web browser
That's it! No server or build process required

📁 Project Structure
nba-matches/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling
├── js/
│   └── app.js          # JavaScript application logic
├── assets/
│   └── favicon.ico     # Basketball icon (optional)
└── README.md           # This file
🌐 API Information

API: Ball Don't Lie NBA API
Endpoint: https://api.balldontlie.io/v1/games
Authentication: None required (completely free)
Rate Limits: Generous limits for personal use
Documentation: balldontlie.io

API Response Example:
json{
  "data": [
    {
      "id": 12345,
      "date": "2025-06-01T19:00:00.000Z",
      "home_team": {
        "id": 1,
        "city": "Los Angeles",
        "name": "Lakers"
      },
      "visitor_team": {
        "id": 2,
        "city": "Boston",
        "name": "Celtics"
      }
    }
  ]
}
🎨 Design Features

Gradient Background: Beautiful purple-blue gradient
Glassmorphism Cards: Modern frosted glass effect
Smooth Animations: Hover effects and transitions
Color-coded Status: Visual indicators for game status
Typography: Clean, readable font hierarchy
Mobile-First: Responsive design principles

🔧 Technical Details
Browser Support

Chrome 80+
Firefox 75+
Safari 13+
Edge 80+

Technologies Used

HTML5: Semantic markup
CSS3: Grid, Flexbox, CSS Variables, Animations
ES6+ JavaScript: Classes, Async/Await, Fetch API
No Frameworks: Pure vanilla implementation

Performance Optimizations

Efficient DOM manipulation
Minimal API calls
CSS animations over JavaScript
Preconnect to API domain
Optimized images and assets

🎯 Features Breakdown
Match Display

Team names and cities
Game date and time (localized)
Status indicators
Responsive card layout

Error Handling

Network error recovery
API unavailable fallback
Sample data when needed
User-friendly error messages

Loading States

Animated spinner
Progressive loading
Skeleton screens
Smooth transitions

🔄 Future Enhancements
Potential features for future versions:

 Team logos and colors
 Live scores for ongoing games
 Favorite teams filtering
 Calendar integration
 Push notifications
 Dark/light theme toggle
 Game statistics
 Historical data

🛠️ Development
Local Development
bash# No build process needed!
# Simply open index.html in your browser

# For live server (optional):
npx live-server
File Modifications

Styling: Edit css/styles.css
Functionality: Modify js/app.js
Structure: Update index.html

API Rate Limits
The Ball Don't Lie API has generous rate limits:

60 requests per minute for free usage
No API key required
CORS enabled for browser requests

📱 Mobile Experience
The application is fully responsive and provides:

Touch-friendly interface
Optimized layouts for small screens
Fast loading on mobile networks
Swipe-friendly card interactions

🎨 Customization
Colors
Edit CSS variables in styles.css:
css:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #ff6b6b;
}
API Configuration
Modify API settings in app.js:
javascriptthis.apiUrl = 'https://api.balldontlie.io/v1/games';
this.matchesPerPage = 25;
this.daysAhead = 14;
📄 License
MIT License - feel free to use this project for personal or commercial purposes.
🤝 Contributing

Fork the repository
Create a feature branch
Make your changes
Test thoroughly
Submit a pull request

📞 Support
If you encounter any issues:

Check the browser console for errors
Verify internet connection
Try refreshing the page
Check if the API is accessible


Made with ❤️ for NBA fans everywhere