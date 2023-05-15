<?php
    $data = file_get_contents("users.json");
    $users = json_decode($data, true);

    $members = [];
    foreach ($users as $username => $userData) {
        if (isset($userData["house"]) and !empty($userData["house"])) {
            $members[] = [
                "username" => $username,
                "house" => $userData["house"] 
            ];
        }
    }

    $response = [
        "members" => $members
    ];

    header("Content-Type: application/json");
    echo json_encode($response);
?>