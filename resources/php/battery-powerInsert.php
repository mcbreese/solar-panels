<?php
// db.php includes our login credentials for the server
include_once '..\db.php';

session_start();

//retrieve our data from POST
$configID = $_SESSION["config_id"];
$id = $_SESSION["user_id"];
$watts = $_POST['watts'];
$battEff = $_POST['batteryEfficiency'];
$pdmEff = $_POST['pdmEfficiency'];
$battCap = $_POST['battCap'];
$voltage = $_POST['battVoltage'];
$dischargeSummer = $_POST['summerArr'];
$dischargeWinter = $_POST['winterArr'];

echo $voltage;

// Convert array into strings using serialize
$dischargeSummer = serialize($dischargeSummer);
$dischargeWinter = serialize($dischargeWinter);

$sql = "INSERT INTO batterypower (configID, employeeID, customerID, watts, battEff, pdmEff, battCap, voltage, sunPower, dischargeSummer, dischargeWinter)
        VALUES ( '$configID', 1, '$id', '$watts', '$battEff', '$pdmEff', '$battCap','$voltage',1000, '$dischargeSummer','$dischargeWinter');";

// Run the insert
mysqli_query($conn, $sql);

// Close the SQL conncetion
mysqli_close($conn);
?>
