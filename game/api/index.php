<?php

include_once './DB.php';
include_once './game.php';

function get_todos($vars)
    {
        $todo = new Game();
        $todo->author = $vars['user']['user_id'];
        return [$todo->get_todos(), 200];
    }

