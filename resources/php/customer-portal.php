<?php
// Starting session
session_start();
// Accessing session data
// If the session variables are set then echo back to JS script to use for data querying
//echo $_SESSION["user_id"] + " " +$_SESSION["email"];
if (isset($_SESSION["user_id"]) && isset($_SESSION["email"])) {
    $return = $_SESSION["user_id"];
    echo $return;
} else {
    echo "";
}
?>
