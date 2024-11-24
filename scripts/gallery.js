const galleryContainer = document.getElementById('gallery-container');

// Base URLs for images
const localServerBase = "http://172.22.125.12:8080/mine_server_gallery/";
const imageListUrl = "http://172.22.125.12:8080/list_images.php";

// Fetch the list of images from the PHP endpoint
fetch(imageListUrl)
    .then(response => response.json())
    .then(images => {
        images.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = `${localServerBase}${img}`;
            imgElement.alt = `Gallery Image - ${img}`;
            galleryContainer.appendChild(imgElement);
        });
    })
    .catch(err => console.error('Failed to fetch image list:', err));
