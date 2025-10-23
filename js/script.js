// GitHub API Configuration
const GITHUB_API_URL = 'https://api.github.com/users';

// DOM Elements
const usernameInput = document.getElementById('username');
const fetchButton = document.getElementById('fetch-repos');
const reposContainer = document.getElementById('repos-container');
const loadingElement = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

// Event Listeners
fetchButton.addEventListener('click', fetchRepositories);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchRepositories();
    }
});

// Fetch repositories from GitHub API
async function fetchRepositories() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        showError('Please enter a GitHub username');
        return;
    }

    // Clear previous results
    reposContainer.innerHTML = '';
    hideError();
    showLoading();

    try {
        // Fetch user's repositories
        const response = await fetch(`${GITHUB_API_URL}/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('User not found. Please check the username and try again.');
            } else if (response.status === 403) {
                throw new Error('API rate limit exceeded. Please try again later.');
            } else {
                throw new Error('Failed to fetch repositories. Please try again.');
            }
        }

        const repos = await response.json();
        
        hideLoading();

        if (repos.length === 0) {
            showError('No repositories found for this user.');
            return;
        }

        displayRepositories(repos);
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

// Display repositories in the grid
function displayRepositories(repos) {
    reposContainer.innerHTML = '';
    
    repos.forEach(repo => {
        const repoCard = createRepoCard(repo);
        reposContainer.appendChild(repoCard);
    });
}

// Create a repository card element
function createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';
    
    const repoLink = document.createElement('a');
    repoLink.href = repo.html_url;
    repoLink.target = '_blank';
    repoLink.rel = 'noopener noreferrer';
    
    const title = document.createElement('h3');
    title.textContent = repo.name;
    
    const description = document.createElement('p');
    description.textContent = repo.description || 'No description available';
    
    const stats = document.createElement('div');
    stats.className = 'repo-stats';
    
    const stars = document.createElement('span');
    stars.innerHTML = `⭐ ${repo.stargazers_count}`;
    
    const forks = document.createElement('span');
    forks.innerHTML = `🍴 ${repo.forks_count}`;
    
    stats.appendChild(stars);
    stats.appendChild(forks);
    
    repoLink.appendChild(title);
    repoLink.appendChild(description);
    
    if (repo.language) {
        const language = document.createElement('span');
        language.className = 'repo-language';
        language.textContent = repo.language;
        repoLink.appendChild(language);
    }
    
    repoLink.appendChild(stats);
    card.appendChild(repoLink);
    
    return card;
}

// Show loading indicator
function showLoading() {
    loadingElement.style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
    loadingElement.style.display = 'none';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
