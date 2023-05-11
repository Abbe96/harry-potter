<?php
    
    $inputJson = file_get_contents("php://input");
    $data = json_decode($inputJson, true);

    $user = $data["user"];
    $movie = $data["movie"];
    $action = $data["action"];

    $moviesJson = file_get_contents("movies.json");
    $movies = json_decode($moviesJson, true);

    foreach ($movies as &$m) { 
        if ($m["title"] === $movie) {
            $likes = $m["likes"];
            $likedByUser = in_array($user, $likes);

            if ($action === "like" && !$likedByUser) {
                $likes[] = $user;
            } elseif ($action === "unlike" && $likedByUser) {
                $likes = array_diff($likes, [$user]);
            }

            $m["likes"] = $likes;
        }
    }

    $updateLikes = json_encode($movies, JSON_PRETTY_PRINT);
    file_put_contents("movies.json", $updateLikes);
    
    $liked = ($action === "like");
    $likes = count($likes);

    $response = ["liked" => $liked, "likes" => $likes];

    header("Content-Type: application/json");
    echo json_encode($response);

?>
