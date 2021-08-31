<?php
// db.php includes our login credentials for the server
include_once '..\db.php';

//retrieve our data from POST
$id = $_POST['id'];
$roofAngle = $_POST['roofAngle'];
$efficiency = $_POST['efficiency'];
$temperature = $_POST['temperature'];
$area = $_POST['area'];
$cost = $_POST['cost'];
$elevationSunSummer = $_POST['elevationSunSummer'];
$elevationSunWinter = $_POST['elevationSunWinter'];
$PPanelSummer = $_POST['PPanelSummer'];
$PPanelWinter = $_POST['PPanelWinter'];
$MTotal = $_POST['MTotal'];
$powerCostSummer = $_POST['powerCostSummer'];
$powerCostWinter = $_POST['powerCostWinter'];

// Get the next configID to use in script
$sql = "select max(configID) + 1 AS 'configID' from powergeneration;";
$resultSet = mysqli_query($conn,$sql);
$configID = mysqli_fetch_assoc($resultSet);
$configID=$configID["configID"];

$sql = "INSERT INTO powergeneration (configID, employeeID, customerID, roofAngle, solarEfficiency, temperature, roofArea, panelCost, sunPower, elevationAngleSummer, elevationAngleWinter, panelPowerSummer, panelPowerWinter, installCost, powerCostSummer, powerCostWinter)
        VALUES ( '$configID', 1, '$id', '$roofAngle', '$efficiency', '$temperature', '$area','$cost',1000, '$elevationSunSummer','$elevationSunWinter', '$PPanelSummer','$PPanelWinter','$MTotal','$powerCostSummer','$powerCostWinter');";
# insert and echo Y to feedback to JS
mysqli_query($conn, $sql);

mysqli_close($conn);
?>