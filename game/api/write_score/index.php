<?php

require_once '../DB.php';

class Game
{
    private $conn;

    public function __construct()
    {
        $database = new DB();
        $this->conn = $database->connect();
    }

    public function write_score()
    {
        $query = file_get_contents(__DIR__ . '/write_score.sql');
        $stmt = $this->conn->prepare($query);
        $this->username = htmlspecialchars($_REQUEST["username"]);
        $this->score = intval(htmlspecialchars($_REQUEST["score"]));
        $stmt->bindParam(':score', $this->score);
        $stmt->bindParam(':username', $this->username);
        $stmt->execute();
    }
}

$game = new Game();
$result = $game -> write_score();
echo json_encode($result);
