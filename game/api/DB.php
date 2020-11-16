<?php

class DB{

    public function connect() {
        $this->conn = NULL;
        
        try {
            $this->conn = new PDO('sqlite:'. __DIR__ . '/db.sqlite');
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
        return $this->conn;
    }
}