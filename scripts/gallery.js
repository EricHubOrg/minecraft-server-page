// Get the gallery container
const galleryContainer = document.getElementById('gallery-container');

// S3 base URL for your bucket
const cloudBase = "https://minecraft-server-gallery.s3.amazonaws.com/";

// List of images
const images = [
    "2024-09-14_13.22.06.png",
    "2024-09-14_13.23.44.png",
    "2024-10-30_21.06.44.png",
    "2024-11-01_19.37.00.png"
];

// Dynamically load images into the gallery
images.forEach(img => {
    const imgElement = document.createElement('img');
    imgElement.src = `${cloudBase}${img}`;
    imgElement.alt = `Gallery Image - ${img}`;
    imgElement.classList.add('gallery-item'); // Class for Masonry and LightGallery
    galleryContainer.appendChild(imgElement);
});

// Initialize Masonry after images have loaded
window.onload = () => {
    new Masonry(galleryContainer, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item', // Use item width as column width
        percentPosition: true, // Allow percentage-based sizing
        gutter: 10 // Space between items
    });

    // Initialize LightGallery
    lightGallery(galleryContainer, {
        selector: '.gallery-item'
    });
};
