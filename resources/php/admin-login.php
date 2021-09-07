<?php
// db.php includes our login credentials for the server
include_once '..\db.php';

//retrieve our data from POST
$email = $_POST['email'];
$pword = $_POST['pword'];

//Check the email and password against the admin accounts
$sql = "select * from admin where email = '$email';";
$resultSet = mysqli_query($conn,$sql);
// If there is a result then the account exists
if(@mysqli_num_rows($resultSet) > 0){
    //check normal user salt and pass                  
    $saltQuery = "select salt from admin where email = '$email';";
    $result = mysqli_query($conn,$saltQuery);
    // Return row as array
    $row = mysqli_fetch_assoc($result);
    $salt = $row['salt'];
    $saltedPW =  $salt . $pword;
    // Use salt and password combination to return hashedPW, this should match the database if correct
    $hashedPW = hash('sha256', $saltedPW);
    $sql = "select * from admin where email = '$email' 
    and password = '$hashedPW'";  
    $resultSet = mysqli_query($conn,$sql);
    // Check if the admin exists otherwise return nothing
    if(@mysqli_num_rows($resultSet) > 0){
        $row = mysqli_fetch_assoc($resultSet);
        echo "Y";
    } 
}
?>