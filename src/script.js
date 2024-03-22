async function fetchGitHubProjects() {
    const n_latest_projects = 4;
    const url = `http://localhost:8000/github-projects/?n_latest=${n_latest_projects}`;
    try {
        const response = await fetch(url);
        const result = await response.json();

        const projectContainer = document.getElementById('github-repos');

        // Loop through and display your GitHub projects
        result.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerHTML = `
                        <h3>${project.name}</h3>
                        <p>${project.description || "No description available."}</p>
                        <a href="${project.html_url}" target="_blank">View on GitHub</a>
                    `;

            projectContainer.appendChild(projectElement);
        });
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
    }
}

fetchGitHubProjects(); // Call the function to run it


async function submitComment(name, comment) {
    const url = 'http://localhost:8000/add-comment/';
    const requestBody = {
        added_by: name,
        description: comment
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        if (response.ok) {
            alert('Comment submitted successfully!');
        } else {
            throw new Error('Failed to submit comment');
        }
    } catch (error) {
        console.error('Error submitting comment:', error);
        alert('An error occurred while submitting the comment');
    }
}

document.getElementById('comment-form').addEventListener('submit', function (event) {

   console.log("herere")
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const name = document.getElementById('comment-form-name').value;
    const comment = document.getElementById('comment-form-description').value;

    // Submit the comment
    submitComment(name, comment);

    // Reset the form fields
    document.getElementById('comment-form-name').value = '';
    document.getElementById('comment-form-description').value = '';
});
