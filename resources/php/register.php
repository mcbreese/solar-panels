<?php
// db.php includes our login credentials for the server
include_once '..\db.php';
# mysqli_connect opens connection to sql server, stored in variable here
$conn=mysqli_connect($servername,$username,$password,"$dbname");
# If connection is blank then error
if(!$conn){
  echo('Could not Connect MySql Server:' .mysql_error());
};

//retrieve our data from POST
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$password1 = $_POST['password1'];
$password2 = $_POST['password2'];
$email = $_POST['email'];
$postcode = $_POST['postcode'];
$budget = $_POST['budget'];


// Hash the function using salt
function createSalt()
{
    $text = md5(uniqid(rand(), true));
    return substr($text, 0, 3);
}
 
$salt = createSalt();
//$password = hash('sha256', $salt . $hash);
$password = hash('sha256', $salt . $password1);

// If the below select statement returns a value then the customer exists and we don't want to add it
$sql="SELECT email from customer WHERE email='$email';";
$currentCustomer=$conn->query($sql)->fetch_assoc();
echo $currentCustomer;
if($currentCustomer!=""){
  echo "This email address already exists in the system!";
} 
else {
  $sql = "INSERT INTO customer ( fname, lname, password, email, salt, postcode, budget)
          VALUES ( '$fname', '$lname', '$password', '$email', '$salt', '$postcode', '$budget');";
  # insert and echo Y to feedback to JS
  if(mysqli_query($conn, $sql)){
    echo "Y";
  } else{
  # else feedback the error
    echo "N";
  };
}
mysqli_close($conn);

?>