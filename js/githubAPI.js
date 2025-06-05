const username = 'angeltcc';
const showRepos = document.querySelector('.projects-section');

showRepos.innerHTML = '<p class="loading">Loading repositories...</p>';


fetch('https://api.github.com/users/angeltcc/repos?per_page=10&sort=updated', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        }).
        then(response => {
            if (response.ok) {
                showRepos.innerHTML = '<h1>Projects</h1>';
                return response.json();
            }
            else {
                throw new Error(`Error: ${response.statusText}`);
            }
        }).
        then( repos => {
            console.log(showRepos);
            repos.forEach( repo => {
                const newItem = document.createElement('div');
                newItem.className = 'project-item';
                newItem.innerHTML = repo.name;
                showRepos.appendChild(newItem);
            });
        }).
        catch(error => {
            console.error('Fetch error:', error);
            showRepos.innerHTML = '<p class="error">Failed to load repositories. Please try again later.</p>';
        });

// name, description, created_at, topics, updated_at, visibility, url
