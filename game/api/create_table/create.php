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

    public function create_table()
    {
        $query = file_get_contents('./create_db.sql');
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $todo_arr = [];
        while ($arr = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($todo_arr, $arr);
        }
        return array_reverse($todo_arr);
    }
}

$game = new Game();
$result = $game -> create_table();
echo json_encode($result);
