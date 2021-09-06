<?php
$servername='localhost';
$username='root';
$password='';
$dbname = "solar";
# mysqli_connect opens connection to sql server, stored in variable here
$conn=mysqli_connect($servername,$username,$password,"$dbname");
# If connection is blank then error
if(!$conn){
  echo('Could not Connect MySql Server:' .mysql_error());
};




// Hash the function using salt
function createSalt()
{
    $text = md5(uniqid(rand(), true));
    return substr($text, 0, 3);
}
 
$salt = createSalt();
//$password = hash('sha256', $salt . $hash);
$password = hash('sha256', $salt . 'solar');

// If the below select statement returns a value then the customer exists and we don't want to add it


  $sql = "INSERT INTO admin ( id, email, password, salt)
          VALUES ( 1, 'admin@solar.co.uk', '$password', '$salt');";
mysqli_query($conn, $sql);
mysqli_close($conn);

?>