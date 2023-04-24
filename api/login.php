<?php
ini_set("display_errors", 1);

// CHECK IF THE LOGIN FORM WAS SUBMITTED
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_SERVER["CONTENT_TYPE"] != "application/json") {
        http_response_code(405);
        header("Content-Type: application/json");
        echo json_encode(["message" => "Method not allowed"]);
        exit;
    }

    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    if (empty($data["username"]) or empty($data["password"])) {
        http_response_code(400);
        header("Content-Type: application/json");
        echo json_encode(["message" => "Bad Request (empty values)"]);
        exit;
    }

    // READ JSON FILE 
    $filename = "users.json";
    $users = json_decode(file_get_contents($filename), true);

    // CHECK IF USERNAME AND PASSWORD ARE VALID
    $found = false;

    foreach ($users as $user) {
        if ($user["username"] == $data["username"] and $user["password"] == $data["password"]) {
            $found = true;
            break;
        }
    }

    if (!$found) {
        http_response_code(401);
        header("Content-Type: application/json");
        echo json_encode(["message" => "The wizard is not a member here"]);
        exit;
    }

    http_response_code(200);
    echo json_encode(["username" => $data["username"], "password" => "secret"]);
    exit;
}
?>