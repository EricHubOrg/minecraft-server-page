// Get the gallery container
const galleryContainer = document.getElementById('gallery-container');

// R2 base URL for your bucket
const cloudBase = "https://pub-99fe58b07618413daf5b1618f0046cec.r2.dev/gallery/";

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

// Function to wait until all images are fully loaded
function imagesLoaded(parentNode) {
    const imgElements = Array.from(parentNode.querySelectorAll('img'));
    return Promise.all(
        imgElements.map((img) => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = resolve; // Resolve even if an image fails to load
                }
            });
        })
    );
}

// Function to dynamically load images into the gallery
function loadImages(images) {
    images.forEach((img) => {
        const imgElement = document.createElement('img');
        imgElement.src = `${cloudBase}${img}`;
        imgElement.alt = `Gallery Image - ${img}`;
        imgElement.classList.add('gallery-item'); // Class for Masonry and LightGallery
        galleryContainer.appendChild(imgElement);
    });

    // Wait for all images to load before initializing Masonry
    imagesLoaded(galleryContainer).then(() => {
        // Initialize Masonry
        new Masonry(galleryContainer, {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-item',
            percentPosition: true,
            gutter: 10,
        });

        // Initialize LightGallery
        lightGallery(galleryContainer, {
            selector: '.gallery-item',
        });
    });
}

// Fetch and load images
fetchImageList();
