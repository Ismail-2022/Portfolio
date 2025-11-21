# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A modern, responsive portfolio website that dynamically fetches and displays GitHub repositories using the GitHub REST API. Built with vanilla HTML, CSS, and JavaScript—no frameworks or build tools required.

## Development Commands

### Running the Application

Start a local web server (recommended for proper CORS handling):

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server -p 8000
```

Then navigate to `http://localhost:8000` in a browser.

Alternatively, you can open `index.html` directly in a browser, though this may have CORS limitations.

### No Build/Test/Lint Commands

This project uses vanilla JavaScript with no build pipeline, package manager, or testing framework. There are no npm/yarn scripts, no webpack/vite, and no automated tests.

## Architecture & Code Structure

### Single-Page Application Flow

The application follows a simple client-side architecture:

1. **Initial Load**: Static HTML renders the portfolio shell with navigation, hero, about, projects, and contact sections
2. **User Interaction**: User enters a GitHub username and clicks "Fetch Repositories"
3. **API Call**: JavaScript fetches repository data from `https://api.github.com/users/{username}/repos`
4. **Dynamic Rendering**: Repository cards are dynamically created and appended to the DOM
5. **Error Handling**: Network failures, 404s, and rate limits display user-friendly error messages

### Key Technical Patterns

#### GitHub API Integration (`js/script.js`)

- **API Endpoint**: `https://api.github.com/users/{username}/repos?sort=updated&per_page=100`
- **Rate Limits**: 
  - Unauthenticated: 60 requests/hour
  - Authenticated: 5,000 requests/hour (requires adding a GitHub token to fetch headers)
- **Error Handling**: Specific messages for 404 (user not found), 403 (rate limit), and generic errors
- **Data Display**: Shows repository name, description, language, stars, and forks

#### DOM Manipulation Strategy

All UI updates are done through imperative DOM manipulation:
- `document.getElementById()` for element selection
- `document.createElement()` for creating repository cards
- `appendChild()` for adding elements to the DOM
- Direct style property manipulation for show/hide (`element.style.display`)

#### State Management

No formal state management—all state is implicit:
- Input field value determines which username to fetch
- DOM presence/absence indicates loading/error states
- Repository data is never cached (fetched fresh each time)

### Styling Architecture (`css/styles.css`)

- **CSS Variables**: Defined in `:root` for colors and theming (lines 8-18)
- **Layout System**: Mix of Flexbox (navigation, input forms) and CSS Grid (repository cards)
- **Responsive Design**: Media query at 768px breakpoint switches to mobile-first stacking
- **Component Isolation**: Each section (hero, about, projects, contact) is self-contained

### File Responsibilities

- `index.html`: Semantic HTML structure, defines all sections and placeholder elements
- `css/styles.css`: All styling including responsive layouts, no CSS-in-JS
- `js/script.js`: All application logic including GitHub API calls, DOM manipulation, and event handling
- `images/`: Optional directory for image assets (currently empty)

## Customization Guidelines

### Updating Personal Information

Edit `index.html`:
- Line 27: Change "Your Name" in the hero section
- Line 28: Update subtitle/tagline
- Lines 36-37: Modify the About section content
- Line 58: Add your GitHub profile link

### Changing Colors/Theme

All colors are CSS variables in `css/styles.css` (lines 8-17). Update these to theme the entire site:
```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #1e40af;    /* Hover states */
    --text-color: #1f2937;         /* Body text */
    /* ... other variables */
}
```

### Adding GitHub Authentication

To increase API rate limits, modify the fetch call in `js/script.js` (line 35) to include an authorization header:
```javascript
const response = await fetch(`${GITHUB_API_URL}/${username}/repos`, {
    headers: {
        'Authorization': `token ${GITHUB_TOKEN}`
    }
});
```

Store the token in an environment variable or retrieve it securely—never hardcode it.

## Browser Compatibility

Targets modern browsers (Chrome, Firefox, Safari, Edge—latest versions). Uses:
- ES6+ features (async/await, template literals, arrow functions)
- CSS Grid and Flexbox
- CSS Custom Properties (variables)

No polyfills or transpilation are configured.
