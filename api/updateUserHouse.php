<?php
    $request = file_get_contents("php://input");
    $data = json_decode($request);

    $users = json_decode(file_get_contents("users.json"), true);

    if (isset($users[$data->user])) {
        $users[$data->user]["house"] = $data->house;
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Wizard not found"]);
        exit;
    }

    file_put_contents("users.json", json_encode($users, JSON_PRETTY_PRINT));

    http_response_code(200);
    echo json_encode(["message" => "Wizard's house updated successfully!"]);
?>
