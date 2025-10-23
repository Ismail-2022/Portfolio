# Portfolio Website

A modern, responsive portfolio website to showcase GitHub repositories.

## Features

- 🎨 Modern and clean design with gradient hero section
- 📱 Fully responsive layout (mobile, tablet, desktop)
- 🔍 Fetch and display GitHub repositories dynamically
- ⭐ Show repository stats (stars, forks, language)
- 🚀 Smooth scrolling navigation
- ⚡ Fast and lightweight (no frameworks required)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - GitHub API integration
- **GitHub REST API** - Fetch repository data

## Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Image assets (optional)
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge)
- (Optional) A local web server for development

### Installation

1. Clone this repository or download the files
2. Open `index.html` in your web browser

### Using a Local Server (Recommended)

For the best experience, use a local web server:

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (with http-server):
```bash
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## Usage

1. Open the website in your browser
2. Scroll to the "My GitHub Projects" section
3. Enter a GitHub username in the input field
4. Click "Fetch Repositories" or press Enter
5. Browse through the displayed repositories
6. Click on any repository card to visit it on GitHub

## Customization

### Update Personal Information

Edit `index.html`:
- Change "Your Name" in the hero section (line 27)
- Update the subtitle/tagline (line 28)
- Modify the About section content (lines 36-37)
- Add your GitHub profile link (line 58)

### Modify Colors

Edit `css/styles.css` CSS variables (lines 8-17):
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --text-color: #1f2937;
    /* ... */
}
```

### API Configuration

The GitHub API has rate limits:
- **Unauthenticated requests**: 60 per hour
- **Authenticated requests**: 5,000 per hour

To use authentication (optional), modify `js/script.js` to include your GitHub token.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements

- [ ] Add dark mode toggle
- [ ] Include filtering/sorting options for repositories
- [ ] Add animations on scroll
- [ ] Include contact form functionality
- [ ] Add skills/technologies section
- [ ] Implement blog section

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to fork this project and make your own modifications!

## Contact

For questions or suggestions, reach out via GitHub.
