<?php
ini_set("display_errors", 1);

if ($_SERVER["REQUEST_METHOD"] == "POST"){
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

    $filename = "users.json";
    $users = json_decode(file_get_contents($filename), true);

    if(!$users) {
        $users = [];
    }

    if (array_key_exists($data["username"], $users)) {
        http_response_code(409);
        header("Content-Type: application/json");
        echo json_encode(["message" => "Conflict (the wizard is already a member, try with another name)"]);
        exit;
    }

    $users[$data["username"]] = array("username" => $data["username"], "password" => $data["password"]);

    if (!file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT))) {
        http_response_code(500);
        header("Content-Type: application/json");
        echo json_encode(["message" => "Could not save the wizard data"]);
        exit;
    }

    http_response_code(200);
    echo json_encode(["username" => $data["username"]]);
}
?>