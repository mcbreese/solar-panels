<?php
// db.php includes our login credentials for the server
include_once '..\db.php';

//retrieve our data from POST
$id = $_POST['customerID'];

//Check the customer exists in the database
$sql = "select budget from customer where id = '$id';";
$resultSet = mysqli_query($conn, $sql);
// If there is a result then the account exists
if (@mysqli_num_rows($resultSet) > 0) {
    $row = mysqli_fetch_assoc($resultSet);
    echo $row["budget"];
}

mysqli_close($conn);
?>
