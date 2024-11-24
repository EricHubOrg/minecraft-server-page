const galleryContainer = document.getElementById('gallery-container');

// S3 base URL for your bucket
const cloudBase = "https://minecraft-server-gallery.s3.amazonaws.com/";

// List of images (you can maintain a list, or generate a file in S3 to list them dynamically)
const images = [
    "2024-09-14_13.22.06.png",
    "2024-09-14_13.23.44.png",
    "2024-10-30_21.06.44.png",
    "2024-11-01_19.37.00.png"
];

// Load images into gallery
images.forEach(img => {
    const imgElement = document.createElement('img');
    imgElement.src = `${cloudBase}${img}`;
    imgElement.alt = `Gallery Image - ${img}`;
    galleryContainer.appendChild(imgElement);
});
