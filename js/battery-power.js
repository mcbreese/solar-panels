$(document).ready(function(){
  $("#submit").click(() => {
    // Followed class diagram and top down and activity
    // Set all the variables which will be fulfilled by database or user input fields

    if (emptyFields()){
      // Database values required:
      var area=10; // metre squared
      var elevationAngle=25; // Degrees
      var sunAngleSummer=[0,0,0,0,2,9,18,27,37,46,54,60,62,60,54,46,37,27,18,9,2,0,0,0];// Degrees, there will need to be an array for Winter
      var sunAngleWinter=[0,0,0,0,0,0,0,0,0,6,11,14,15,14,11,6,0,0,0,0,0,0,0,0];
      var efficiency = 0.2
      var power= 1000;
      var area=10;

      // User Input Fields:
      var batteryEfficiency=parseInt($("#battery-efficiency").val()); // %
      var pdmEfficiency=parseInt($("#pdm-efficiency").val()); // %
      var battCap=parseInt($("#battery-capacity").val()); // Amp hours
      var battVoltage=parseInt($("#battery-voltage").val()); // Volts
      var watts=parseInt($("#power-consumption").val()); // Watts

      // Convert efficiency % to decimals
      batteryEfficiency=batteryEfficiency/100;
      pdmEfficiency=pdmEfficiency/100;
      // Run the calculations
      // Update the elevation angles of the house + the sun on horizon array
      sunAngleSummer=angleOfSun(sunAngleSummer, elevationAngle);
      sunAngleWinter=angleOfSun(sunAngleWinter, elevationAngle);
      // Determine the battery charge over 24 hours
      // Input 250 and 12 in this test
      // Run once for summer angles
      var summerArr=twentyFourHoursCharge(battCap, battVoltage, efficiency, power, area, batteryEfficiency, pdmEfficiency, watts, sunAngleSummer);
      var winterArr=twentyFourHoursCharge(battCap, battVoltage, efficiency, power, area, batteryEfficiency, pdmEfficiency, watts, sunAngleWinter);
      var timeArr=['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00',]
      loadChart(chartArr(summerArr, winterArr, timeArr));
      // Find if at any point the battery becomes more than 75% discharged
      var summerOutput=find75Discharge(summerArr);
      var winterOutput=find75Discharge(winterArr);
      var summerOutputHTML="Summer Solstice <br/> On the summer solstice, the battery would discharge over 75% at " + summerOutput;
      var winterOutputHTML="Winter Solstice <br/> On the winter solstice, the battery will discharge over 75% at " + winterOutput;
      // If summer output has a battery discharge of over 75% then
      if(summerOutput[0]){
        $("#summerOutput").html(summerOutputHTML);
      }
      else {
        $("#summerOutput").html("Summer Solstice <br/> The battery will not discharge more than 75% on the summer solstice!");
      }
      if(winterOutput[0]){
        $("#winterOutput").html(winterOutputHTML);
      } 
      else {
        $("#winterOutput").html("Winter Solstice <br/> The battery will not discharge more than 75% on the winter solstice!");
      };

    } else {
      alert("Required values are missing!");
    }
  });
});

function emptyFields(){
  if (!$("#battery-efficiency").val()){
    console.log("ERROR - Battery Efficiency is blank");
  }
  if (!$("#pdm-efficiency").val()){
    console.log("ERROR - PDM Efficiency is blank");
  }
  if (!$("#battery-capacity").val()){
    console.log("ERROR - Battery Capacity is blank");
  }
  if (!$("#battery-voltage").val()){
    console.log("ERROR - Battery Voltage is blank");
  }
  if (!$("#power-consumption").val()){
    console.log("ERROR - Power Consumption is blank");
  }
  else{
    console.log("SUCCESS - All fields filled successfully");
    return true;
}};



// Sets up data for the Google chart
function loadChart(chartArr){
  google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
          var data = google.visualization.arrayToDataTable(chartArr);

          var options = {
            title: 'Battery Discharge',
            curveType: 'function',
            legend: { position: 'bottom' }
          };

          var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

          chart.draw(data, options);
        }
}

function find75Discharge(arr){
  var dischargeTimes=[];
  for(i=0; i<24; i++){
    if(arr[i]>=75){
      dischargeTimes.push(i);
    }
    
  }
  return dischargeTimes;
};

function chartArr(summerArr, winterArr, timeArr){
  var chartArr=[["Time", "Summer", "Winter"]];
  for(i=0; i<24; i++){
    chartArr.push([timeArr[i],parseFloat(summerArr[i]), parseFloat(winterArr[i])]);
  }
  console.log(chartArr);
  return chartArr;
};

// Elevation angles
function angleOfSun(sunAngle, elevationAngle){
  // If 0 do nothing as below horizon, else add the roof angle to the sun
  for(let x=0; x<sunAngle.length; x++){
    if (sunAngle[x]==0){
      // Do nothing
    }
    else {
      // 25 is the roof angle
      sunAngle[x]+=elevationAngle;
    }
  }
  return sunAngle;
}

// Total Power Output of the BCM
function generateBCMOutput(solarEfficiency, power
, area, batteryEfficiency, elevationAngle){
// PBCM = C × PSun × A × BCMeff × sin(ESunRoof)
// Same values as before + BCMeff
// Will need to carry them over?
elevationAngle= (Math.PI / 180) * elevationAngle;
let bcmOutput= solarEfficiency*power*area*batteryEfficiency*Math.sin(elevationAngle);

//console.log("The Battery Charge Module (BCM) that manages the power generated by the solar panel is outputting = " + bcmOutput + " Watts");

return bcmOutput;
};

// Power Distribuion Efficiency is 0.9, the watts is 300
// PDM disitributes power to the house
function generateBaseLoad(watts, pdmEfficiency){
watts+=30; // Add 30W for the equipment - describe on webpage
let baseLoad=watts + ((1 - pdmEfficiency) * watts);
// Watts always 330 then
// The lower efficiency of the PDM increases the base load
//console.log("PDM Efficiency = "+ pdmEfficiency);
return baseLoad;
};

// This function shows what the battery charge module is currently outputting minus the base load of the house, whats left is the power balance and will go into the battery?
function generatePowerBalance(bcmOutput, baseLoad){
  let powerBalance=bcmOutput-baseLoad;
  return powerBalance;
};

function instantaneousChargeDischarge(powerBalance, battVoltage){
let charge=powerBalance/battVoltage;
return charge;

};

function generateStateOfCharge(battCap, charge){
// Now I need to iterate
// Batt charge of previous time step (begin at max which is 250A) + iCharge of current time step
// Initial battery charge = 
//console.log("Battery capacity is " + battCap);
  if(battCap+charge <= 0){
    return 0;
  } 
  if (battCap+charge >= 250){
    return 250;
  } else {
    return battCap+charge;
  }
};

function twentyFourHoursCharge(battCap, battVoltage, efficiency, power, area, batteryEfficiency, pdmEfficiency, watts, sunAngle){
 let totalCap=battCap;
 let dischargeArr=[];
 for(i=0; i<24; i++){
    // Generate the power balance which requires BCM Output and the base load
    let powerBalance=generatePowerBalance(
    generateBCMOutput(efficiency, power, area, batteryEfficiency, sunAngle[i]),
    generateBaseLoad(watts, pdmEfficiency));
    //console.log("The BCM and PDM balance atm is " + powerBalance);
    // Then generate the charge with that power balance which is in Amps
    let charge=instantaneousChargeDischarge(powerBalance, battVoltage);
    //console.log("The battery charge is currently " + charge + " A");
    // Use the charge to determine the battery charge in Amp Hours
    let battCharge=generateStateOfCharge(battCap,charge);
    //console.log("In amp hours the battery charge is " + battCharge);
    battCap=battCharge;
    let discharge=generateSummerWinterDepth(battCharge,totalCap);
    
    //console.log("At " + i + " the battery discharge is " + discharge+ " %");
    dischargeArr.push(discharge.toFixed(2));
 }
 return dischargeArr;
}

function generateSummerWinterDepth(battCharge,totalCap){
  // ???
  let discharge=(1-(battCharge/totalCap)) * 100;
  return discharge;
};

