// Container for the news list
const newsListContainer = document.getElementById('news-list');

// Base path for images in the GitHub repository
const newsImageBasePath = 'github_images/';

// Path to the JSON file
const newsJsonPath = 'news.json';

// Function to fetch news data
async function fetchNewsItems() {
    try {
        const response = await fetch(newsJsonPath);
        if (!response.ok) {
            throw new Error('Failed to fetch news items');
        }
        const newsItems = await response.json();
        renderNewsItems(newsItems);
    } catch (error) {
        console.error('Error fetching news items:', error);
    }
}

// Function to render news items
function renderNewsItems(items) {
    items.forEach(item => {
        // Create a container for each news item
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        // Content container
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('news-item-content');

        // Title
        const title = document.createElement('h3');
        title.textContent = item.title;
        contentDiv.appendChild(title);

        // Description
        const description = document.createElement('p');
        description.textContent = item.description;
        contentDiv.appendChild(description);

        // Sublist (if any)
        if (item.sublist && item.sublist.length > 0) {
            const sublist = document.createElement('ul');
            item.sublist.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                sublist.appendChild(li);
            });
            contentDiv.appendChild(sublist);
        }

        // Image container
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('news-item-image');

        const img = document.createElement('img');
        img.src = `${newsImageBasePath}${item.image}`;
        img.alt = item.title;
        imageDiv.appendChild(img);

        // Combine content and image into the news item
        newsItem.appendChild(contentDiv);
        newsItem.appendChild(imageDiv);

        // Append news item to the main container
        newsListContainer.appendChild(newsItem);
    });
}

// Fetch and render the news items
fetchNewsItems();
