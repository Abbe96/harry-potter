<?php
ini_set("display_errors", 1);

function sendJSON($message, $response_code = 200) {
    header("content-type: application/json");
    http_response_code($response_code);
    echo json_encode($message);
    exit();
 } 

 if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $all_movies = json_decode(file_get_contents("movies_test.json"), true);
    $like = json_decode(file_get_contents("php://input"), true);
    
    for ($i = 0; $i < count($all_movies); $i++) {
        if ($all_movies[$i]["title"] == $like["movie"]) {
            $all_movies[$i]["likes"] += $like["like_count"];
        }
    }
}

    file_put_contents("movies_test.json", json_encode($all_movies, JSON_PRETTY_PRINT) );
    $message = ["message" => "Like added!"];
    sendJSON($message);


?>