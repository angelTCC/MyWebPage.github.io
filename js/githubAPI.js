const username = 'angeltcc';
const showRepos = document.querySelector('.projects-section');
const GITHUB_API = `https://api.github.com/users/${username}/repos?per_page=10&sort=updated`;
const CACHE_KEY = 'githubRepos';
const CACHE_TIMESTAMP_KEY = 'githubReposTimestamp';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hora

// Mostrar mensaje inicial
showRepos.innerHTML = '<p class="loading">Loading repositories...</p>';

// Función para mostrar los repos
function renderRepos(repos) {
  showRepos.innerHTML = '<h1>Projects</h1>';
  repos.forEach(repo => {
    const newItem = document.createElement('div');
    newItem.className = 'project-item';
    newItem.innerHTML = `
      <strong>${repo.name}</strong><br>
      ${repo.description || 'No description'}<br>
      <a href="${repo.html_url}" target="_blank">View Repo</a>
    `;
    showRepos.appendChild(newItem);
  });
}

// Verifica si hay datos en caché válidos
const cachedRepos = localStorage.getItem(CACHE_KEY);
const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);
const now = Date.now();

if (cachedRepos){// && cachedTime && (now - cachedTime < CACHE_DURATION)) {
  // Usar datos en caché
  renderRepos(JSON.parse(cachedRepos));
} else {
  // Hacer fetch a GitHub
  fetch(GITHUB_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return response.json();
    })
    .then(repos => {
      // Guardar en caché
      localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now());
      renderRepos(repos);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      showRepos.innerHTML = '<p class="error">Failed to load repositories. Please try again later.</p>';
    });
}

// name, description, created_at, topics, updated_at, visibility, url
