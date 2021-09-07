<?php
// db.php includes our login credentials for the server
include_once '..\db.php';

//retrieve our data from POST
$email = $_POST['email'];
$pword = $_POST['pword'];

// https://hzonesp.com/php/login-using-salt-hash-password-logout-php-mysql/
//Check the email and password against the customer accounts
$sql = "select * from customer where email = '$email';";
$resultSet = mysqli_query($conn, $sql);
// If there is a result then the account exists
if (@mysqli_num_rows($resultSet) > 0) {
    //check normal user salt and pass
    $saltQuery = "select salt from customer where email = '$email';";
    $result = mysqli_query($conn, $saltQuery);
    // Return row as array
    $row = mysqli_fetch_assoc($result);
    $salt = $row['salt'];
    $saltedPW = $salt . $pword;
    // Use salt and password combination to return hashedPW, this should match the database if correct
    $hashedPW = hash('sha256', $saltedPW);
    $sql = "select * from customer where email = '$email' 
    and password = '$hashedPW' ";
    $resultSet = mysqli_query($conn, $sql);
    // Check if the customer exists
    if (@mysqli_num_rows($resultSet) > 0) {
        $row = mysqli_fetch_assoc($resultSet);
        echo "Y";
        // https://www.tutorialrepublic.com/php-tutorial/php-sessions.php
        // Begin session and assign session variables
        session_start();
        $_SESSION["user_id"] = $row["id"];
        $_SESSION["email"] = $row["email"];
    } else {
        // The customer does not exist or the credentials are incorrect
        echo "N";
    }
}
?>
