<?php
ini_set("display_erros", 1);

$json = file_get_contents("characters.json");

if ($json == false) {
    echo "Error, failed to read json-file";
    exit;
}

$characters = json_decode($json, true);

if ($characters == null) {
    echo "Error, failed to decode json";
    exit;
}

foreach ($characters as $character) {
    if (!isset($character["name"]) || !isset($character["link"])) {
        echo "Error, missin keys";
        exit;
    }

    $response[] = [
        "name" => $character["name"],
        "link" => $character["link"]
    ];
}

header("Content-Type: application/json");
echo json_encode($response);

?>