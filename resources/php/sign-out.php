<?php
session_start();
unset($_SESSION['user_id']);
unset($_SESSION['email']);
session_destroy();

echo "Y";
?>