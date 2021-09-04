<?php
// db.php includes our login credentials for the server
include_once '..\db.php';

// Assign variable passed from JS returnData function
$customerID = $_POST['customerID'];

// Return information from the database
$sql = "SELECT t1.`panelPowerSummer`, t1.`panelPowerWinter`, t1.`installCost`, t1.`powerCostSummer`, t1.`powerCostWinter`, t2.`dischargeSummer`, t2.`dischargeWinter` FROM `powergeneration` AS t1 JOIN `batterypower` AS t2 ON t1.customerID = t2.customerID AND t1.configID = t2.configID WHERE t1.customerID ='$customerID' ;";
$resultSet = mysqli_query($conn,$sql);

// If the database returns rows then query is a success
if(@mysqli_num_rows($resultSet) > 0){
    // Place results into an array
    while($row=mysqli_fetch_array($resultSet)){
        $panelPowerSummer=$row['panelPowerSummer'];
        $panelPowerWinter=$row['panelPowerWinter'];
        $installCost=$row['installCost'];
        $powerCostSummer=$row['powerCostSummer'];
        $powerCostWinter=$row['powerCostWinter'];

        // Deserialize the arrays as they have been stored as strings in the database table
        $dischargeSummer=$row['dischargeSummer'];
        $dischargeSummer=unserialize($dischargeSummer);
        $dischargeWinter=$row['dischargeWinter'];
        $dischargeWinter=unserialize($dischargeWinter);

        $returnArray[]= array($panelPowerSummer, $panelPowerWinter, $installCost, $powerCostSummer, $powerCostWinter, $dischargeSummer, $dischargeWinter);
    };
    // We have made an array so need to encode it into JSON format
    echo json_encode($returnArray);;
} else {
    // If query does not return rows then return an error to the JS file
    echo "error";
}

// Close the SQL connection
mysqli_close($conn);
?>