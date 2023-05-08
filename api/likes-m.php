<?php
    
    $rqstBody = file_get_contents("php://input");
    $data = json_decode($rqstBody);

    $username = $data->user;
    $title = $data->title;

    $json = file_get_contents("movies.json");
    $movies = json_decode($json, true);

    $index = array_search($username, $movies[$title]["likes"]);
    if ($data->action === "like") {
        if ($index === false) {
            array_push($movies[$title]["likes"], $username);
        } 
    } elseif ($data->action === "unlike") {
        if ($index !== false) {
            array_splice($movies[$title]["likes"], $index, 1);
        }
    }

    // SAVE UPDATED CHARACTERS TO FILE
    file_put_contents("movies.json", json_encode($movies, JSON_PRETTY_PRINT));

    http_response_code(200);
    echo json_encode(["message" => $movies[$title]["title"] . " is liked/unlike"]);

?>
