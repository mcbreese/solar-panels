<?php

//retrieve our data from POST
//$data = $_POST['data'];
//echo $data;

/*
session_start();
unset($_SESSION['user_id']);
 unset($_SESSION['email']);
 session_destroy();
 */

// Starting session
session_start();
$return=$_SESSION["user_id"];
// Accessing session data
// If the session variables are set then echo back to JS script to use for data querying
if(isset($_SESSION["user_id"]) && isset($_SESSION["email"])){
    echo $return;
} else {
    echo "";
};
?>