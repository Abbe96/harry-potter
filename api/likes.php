<?php
    
    $rqstBody = file_get_contents("php://input");
    $data = json_decode($rqstBody);

    $username = $data->user;
    $character = $data->character;

    $json = file_get_contents("characters.json");
    $characters = json_decode($json, true);

    $index = array_search($username, $characters[$character]["likes"]);
    if ($data->action === "like") {
        if ($index === false) {
            array_push($characters[$character]["likes"], $username);
        } 
    } elseif ($data->action === "unlike") {
        if ($index !== false) {
            array_splice($characters[$character]["likes"], $index, 1);
        }
    }

    // SAVE UPDATED CHARACTERS TO FILE
    file_put_contents("characters.json", json_encode($characters, JSON_PRETTY_PRINT));

    http_response_code(200);
    echo json_encode(["message" => $characters[$character]["name"] . " is liked/unlike"]);

?>
