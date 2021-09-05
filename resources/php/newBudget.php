<?php
// db.php includes our login credentials for the server
include_once '..\db.php';

//retrieve our data from POST
$budget = $_POST['newBudget'];
$id= $_POST['customerID'];

//Update with the new budget
$sql = "update customer set budget = '$budget' where id = '$id';";

// Insert into database
mysqli_query($conn,$sql);

// Check the update
$sql = "select budget from customer where id = '$id';";

$resultSet = mysqli_query($conn,$sql);
// If there is a result then the account exists
if(@mysqli_num_rows($resultSet) > 0){
    $row = mysqli_fetch_assoc($resultSet);
    echo $row["budget"];
} else {
    // Error, echo no response and JS will alert page
};
mysqli_close($conn);
?>