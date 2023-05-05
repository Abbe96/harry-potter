<?php

    ini_set("display_errors", 1);

    $rqstBody = file_get_contents("php://input");
    $data = json_decode($rqstBody);

    // GET THE CHARACTER NAME AND INCREMENT VALUE FROM RQST DATA
    $characterName = $data->character;
    $increment = $data->increment;

    $json = file_get_contents("characters.json");
    $characters = json_decode($json, true);

    if (isset($characters[$characterName])) {
        if ($increment) {
            $characters[$characterName]["likes"]++;
        } else {
            $characters[$characterName]["likes"]--;
        } 
    }

    // ENCODE THE UPDATED CHARACTERS DATA AS JSON
    $updateData = json_encode($characters, JSON_PRETTY_PRINT);
    // WRITE THE UPDATED CHARACTERS DATA BACK TO FILE 
    file_put_contents("characters.json", $updateData);

    header("Content-Type: application/json");
    echo json_encode(["name" => $characters[$characterName]["name"], "likes" => $characters[$characterName]["likes"]]);
?>