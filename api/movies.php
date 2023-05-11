<?php

    ini_set("display_errors", 1);

    $json = file_get_contents("movies.json");
    if ($json === false) {
        // Display an error message if file_get_contents fails
        echo "Failed to read JSON file";
        exit;
    }

    $movies = json_decode($json, true);
    if ($movies === null) {
        // Display an error message if json_decode fails
        echo "Failed to decode JSON";
        exit;
    }

    foreach ($movies as $movie) {
        if (!isset($movie["title"]) or !isset($movie["year"]) or !isset($movie["cover"]) or !isset($movie["plot"]) or !isset($movie["likes"])){
            // Display an error message if required keys are missing
            echo "Missing keys in JSON";
            exit;
        }

        $response[] = [
            "title" => $movie["title"],
            "year" => $movie["year"],
            "cover" => $movie["cover"],
            "plot" => $movie["plot"],
            "likes" => $movie["likes"]
        ];
    }

    header("Content-Type: application/json");
    echo json_encode($response);

?>