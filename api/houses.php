<?php
ini_set("display_errors", 1);

$json = file_get_contents("houses.json");
if ($json === false) {
    // Display an error message if file_get_contents fails
    echo "Failed to read JSON file";
    exit;
}

$houses = json_decode($json, true);
if ($houses === null) {
    // Display an error message if json_decode fails
    echo "Failed to decode JSON";
    exit;
}

foreach ($houses as $house) {
    if (!isset($house["name"]) || !isset($house["description"])) {
        // Display an error message if required keys are missing
        echo "Missing keys in JSON";
        exit;
    }

    $response[] = [
        "name" => $house["name"],
        "description" => $house["description"]
    ];
}

header("Content-Type: application/json");
echo json_encode($response);

?>