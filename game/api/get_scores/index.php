<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, authorization");

require_once '../api.php';

$game = new Game();
$result = $game -> get_scores();
echo json_encode($result);
