<?php

//retrieve our data from POST
$data = $_POST['data'];
echo $data;

// Starting session
session_start();
// Accessing session data
echo 'Hi, ' . $_SESSION["user_id"] . ' ' . $_SESSION["email"];

// Session!!!!!!!!! IT WORKS!!
?>