<?php

    ini_set("display_errors", 1);

    $rqstBody = file_get_contents("php://input");
    $data = json_decode($rqstBody);

    // GET THE CHARACTER NAME AND INCREMENT VALUE FROM RQST DATA
    $characterName = $data->character;
    $username = $data->username;

    $json = file_get_contents("characters.json");
    $characters = json_decode($json, true);

    if (isset($characters[$characterName])) {
        $likes = $characters[$characterName]["likes"];

        // CHECK IF THE USER ALREADY EXISTS IN THE LIKES ARRAY
        $index = array_search($username, $likes);
        if ($index === false) {
            // ADD USER TO LIKES ARRAY
            array_push($likes, $username);
        } else {
            // REMOVE USER FROM LIKES ARRAY
            array_splice($likes, $index, 1);
        }

        // UPDATE LIKES CONT IN THE CHARACTERS DATA
        $characters[$characterName]["likes"] = count($likes);
        $characters[$characterName]["likesBy"] = $likes;
    }

    // ENCODE THE UPDATED CHARACTERS DATA AS JSON
    $updateData = json_encode($characters, JSON_PRETTY_PRINT);
    // WRITE THE UPDATED CHARACTERS DATA BACK TO FILE 
    file_put_contents("characters.json", $updateData);

    header("Content-Type: application/json");
    echo json_encode(["name" => $characters[$characterName]["name"], "likes" => $characters[$characterName]["likes"]]);

?>