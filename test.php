<?php
$conn = mysql_connect('localhost', 'root', '');
mysql_select_db('solar', $conn);
 
//sanitize username
$username = mysql_real_escape_string($username);
 
$query = "INSERT INTO customer ( fname, lname, password, email, salt, postcode, budget)
        VALUES ( 'tom', 'breese', 'test', 'breese_thomas@yahoo.com', 'test', 'SY2 5LY', '100');";
mysql_query($query);
 
mysql_close();
?>