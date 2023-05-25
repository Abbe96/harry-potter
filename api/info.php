<?php
// Read the JSON file
$jsonData = file_get_contents('info.json');

// Set the response headers
header('Content-Type: application/json');
// Send the JSON response
echo $jsonData;

?>
