document.addEventListener('DOMContentLoaded', function () {
  const username = 'angeltcc';
  const showRepos = document.getElementById('project');
  const GITHUB_API = `https://api.github.com/users/${username}/repos?per_page=10&sort=updated`;
  const CACHE_KEY = 'githubRepos';
  const CACHE_TIMESTAMP_KEY = 'githubReposTimestamp';
  const CACHE_DURATION = 1000 * 60 * 60; // 1 hora

  showRepos.innerHTML = '<p>Loading repositories...</p>';

  function renderRepos(repos) {
    showRepos.innerHTML = '<h1>Projects</h1>';
    repos.forEach(repo => {
      const newItem = document.createElement('div');
      newItem.className = 'project-item';
      newItem.innerHTML = `
        <h5>${repo.name}</h5>
        <lu>
          <li><strong>Description : </strong>${repo.description || 'No description'}</li>
          <li><strong>Updated : </strong>${repo.updated_at}</li>
          <li><strong>GitHub URL : </strong><a href="${repo.html_url}" target="_blank">View Repo</a></li>
          <li><strong>Topics:</strong> ${repo.topics}</li>
        </lu>
        <br>
      `;
      showRepos.appendChild(newItem);
    });
  }

  const cachedRepos = localStorage.getItem(CACHE_KEY);
  const cachedTimeRaw = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  const cachedTime = cachedTimeRaw ? Number(cachedTimeRaw) : 0;
  const now = Date.now();

  if (cachedRepos && !isNaN(cachedTime) && (now - cachedTime < CACHE_DURATION)) {
    renderRepos(JSON.parse(cachedRepos));
  } else {
    fetch(GITHUB_API)
      .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        console.log('Fetch response status:', response.status);
        return response.json();
      })
      .then(repos => {
        localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        console.log('Repositories fetched:', repos);
        showRepos.innerHTML = '<h1>Projects</h1>';
        renderRepos(repos);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        showRepos.innerHTML = '<p class="error">Failed to load repositories. Please try again later.</p>';
      });
  }
});