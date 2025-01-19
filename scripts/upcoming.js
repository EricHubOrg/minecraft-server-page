// Container for the upcoming features
const upcomingContainer = document.getElementById('upcoming-container');

// Base path for images in the GitHub repository
const imageBasePath = 'github_images/';

// Path to the JSON file in the repository
const upcomingJsonPath = 'upcoming.json';

// Function to fetch upcoming features
async function fetchUpcomingFeatures() {
    try {
        const response = await fetch(upcomingJsonPath);
        if (!response.ok) {
            throw new Error('Failed to fetch upcoming features');
        }
        const features = await response.json();
        renderUpcomingFeatures(features);
    } catch (error) {
        console.error('Error fetching upcoming features:', error);
    }
}

// Function to render the features
function renderUpcomingFeatures(features) {
    features.forEach(feature => {
        // Create a card element
        const card = document.createElement('div');
        card.classList.add('upcoming-card');

        // Add image
        const img = document.createElement('img');
        img.src = `${imageBasePath}${feature.image}`;
        img.alt = feature.title;
        card.appendChild(img);

        // Add title
        const title = document.createElement('h3');
        title.textContent = feature.title;
        card.appendChild(title);

        // Add description
        const description = document.createElement('p');
        description.textContent = feature.description;
        card.appendChild(description);

        // Append card to container
        upcomingContainer.appendChild(card);
    });
}

// Fetch and render features
fetchUpcomingFeatures();
