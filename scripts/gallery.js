// Get the gallery container
const galleryContainer = document.getElementById('gallery-container');

// S3 base URL for your bucket
const cloudBase = "https://minecraft-server-gallery.s3.amazonaws.com/";

// Function to fetch the list of images from images.txt
async function fetchImageList() {
    try {
        const response = await fetch(`${cloudBase}images.txt`);
        if (!response.ok) {
            throw new Error('Failed to fetch image list');
        }
        const text = await response.text();
        const images = text.split('\n').filter(name => name.trim().length > 0);
        loadImages(images);
    } catch (error) {
        console.error('Error fetching image list:', error);
    }
}

// Function to dynamically load images into the gallery
function loadImages(images) {
    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = `${cloudBase}${img}`;
        imgElement.alt = `Gallery Image - ${img}`;
        imgElement.classList.add('gallery-item'); // Class for Masonry and LightGallery
        galleryContainer.appendChild(imgElement);
    });

    // Initialize Masonry after images have loaded
    new Masonry(galleryContainer, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item',
        percentPosition: true,
        gutter: 10
    });

    // Initialize LightGallery
    lightGallery(galleryContainer, {
        selector: '.gallery-item'
    });
}

// Fetch and load images
fetchImageList();
