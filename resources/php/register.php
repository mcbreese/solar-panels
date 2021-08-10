<?php
//retrieve our data from POST
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$password1 = $_POST['password1'];
$password2 = $_POST['password2'];
$email = $_POST['email'];
$postcode = $_POST['postcode'];
$budget = $_POST['budget'];

// Check pword 1 and 2 match
if($password1 != $password2)
    header('Location: registration.html');
 
//if(strlen($username) > 30)
  //  header('Location: registration.html');

$hash = hash('sha256', $password1);

// Hash the function using salt
function createSalt()
{
    $text = md5(uniqid(rand(), true));
    return substr($text, 0, 3);
}
 
$salt = createSalt();
$password = hash('sha256', $salt . $hash);
$conn = mysql_connect('localhost', 'root', '');
mysql_select_db('solar', $conn);
 
//sanitize username
$username = mysql_real_escape_string($username);
 
$query = "INSERT INTO customer ( fname, lname, password, email, salt, postcode, budget)
        VALUES ( '$fname', '$lname', '$password', '$email', '$salt', '$postcode', '$budget');";
mysql_query($query);
 
mysql_close();
 
echo "response PHP";
?>