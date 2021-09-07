<?php
// db.php includes our login credentials for the server
include_once '..\db.php';
// Starting session
session_start();
// Accessing session data, this is from the power generation page to ensure we get the same customer
$user_id = $_SESSION["user_id"];
$config_id = $_SESSION["config_id"];
// Return information from the database
$sql = "select roofArea, roofAngle, solarEfficiency from powergeneration where customerID = '$user_id' and configID = '$config_id';";
$resultSet = mysqli_query($conn, $sql);
// If the database returns rows then query is a success
if (@mysqli_num_rows($resultSet) > 0) {
    // Place results into an array
    $resultSet = mysqli_fetch_assoc($resultSet);
    $area = $resultSet["roofArea"];
    $elevationAngle = $resultSet["roofAngle"];
    $efficiency = $resultSet["solarEfficiency"];
    // Return as array
    echo "[$area, $elevationAngle, $efficiency]";
} else {
    // If query does not return rows then return an error to the JS file
    echo "error";
}

// Close the SQL conncetion
mysqli_close($conn);
?>
