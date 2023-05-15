<?php
    $user = $_GET["user"];
    $data = file_get_contents("users.json");
    $users = json_decode($data, true);

    //CHECK IF THE USER EXIST IN THE DATA
    if (isset($users[$user])) {
        //CHECK IF USER HAS A HOUSE VALUE
        if(isset($users[$user]["house"]) and !empty($users[$user]["house"])) {
            $house = $users[$user]["house"];
            echo json_encode(["house" => $house]);
        } else {
            echo json_encode(["message" => "The Wizard does not have a house"]);
        }
    } else {
        echo json_encode(["message" => "Wizard not found"]);
    }
?>