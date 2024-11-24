<?php
// Path to the images directory
$dir = "/home/eric_server/images/mine_server_gallery";

// Scan directory for files and filter for images
$files = array_diff(scandir($dir), array('.', '..'));

// Filter to include only .jpg and .png files
$images = array_values(array_filter($files, function($file) {
    return preg_match('/\.(jpg|png)$/i', $file);
}));

// Return the list as a JSON response
header('Content-Type: application/json');
echo json_encode($images);
?>
