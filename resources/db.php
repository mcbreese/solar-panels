<?php
    $servername='localhost';
    $username='root';
    $password='';
    $dbname = "solar";
    # mysqli_connect opens connection to sql server, stored in variable here
    $conn=mysqli_connect($servername,$username,$password,"$dbname");
    # If connection is blank then error
      if(!$conn){
          die('Could not Connect MySql Server:' .mysql_error());
        }

?>
