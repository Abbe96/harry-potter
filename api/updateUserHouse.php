<?php
    // Read the existing users data from the file
    $users = json_decode(file_get_contents("users.json"), true);

    // Find the user with the matching username (in this example, we're assuming the username is passed as a query parameter)
    $username = $_GET["username"];
    $userIndex = array_search($username, array_column($users, "username"));

    if ($userIndex !== false) {
        // Get the house name and color (in this example, we're assuming they're passed as query parameters)
        $houseName = $_GET["houseName"];
        $houseColor = $_GET["houseColor"];

        // Update the user's "house" field
        $users[$userIndex]["house"] = [
            "name" => $houseName,
            "color" => $houseColor
        ];

        // Write the updated users data back to the file
        file_put_contents("users.json", json_encode($users));
    }
?>
