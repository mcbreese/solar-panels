

$(document).ready(function(){
  $("#submit").click(() => {
    // Check this customer exists in the database
    if (getCustomerPostCode($("#customer").val())){
      // Assign the postcode value to a variable for the API call
      var custPostcode = getCustomerPostCode($("#customer").val());
      custPostcode.trim;
      console.log("The customer postcode is = " + custPostcode);
      // If none of the fields are empty then continue with the calculations
      if (emptyFields()){
        // Assign the variables from the field
        console.log("Run the Power Generation Scripts")
        var customer=$("#customer").val();
        var area=$("#area").val();
        var cost=$("#cost").val();
        var efficiency=$("#panelType").val();
        var temperature=$("#temperature").val();
        var roofAngle=parseInt($("#roofAngle").val());
        // Assign the variables with the calculation outputs
        let MTotal = generateInstallCost(area,cost);
        let elevationSunSummer=generateElevationAngleSunRoof(roofAngle,'summer');
        let elevationSunWinter=generateElevationAngleSunRoof(roofAngle,'winter');
        let PPanelSummer = Math.round(generatePowerOfPanel(efficiency,1000,area,'summer', roofAngle, temperature));
        let PPanelWinter = Math.round(generatePowerOfPanel(efficiency,1000,area, 'winter', roofAngle, temperature));
        let powerCostSummer = generatePowerCost(PPanelSummer, MTotal);
        let powerCostWinter = generatePowerCost(PPanelWinter, MTotal);
        // Prepare the HTML which will be output on the page
        var htmlSummer="Summer Solstice <br/> " +
                      " The installation cost of the panels = £" + MTotal + " <br/>" +
                      " Assumed maximum noon-time power generation = " + PPanelSummer + "W <br/>" +
                      " Cost of power generated at this time = £" + powerCostSummer + " per Watt";
        var htmlSummerBreakdown="<br/> Installation cost = " + area + " x " + cost +"<br/>" +
                                "Power Generation = " + efficiency + " x 1000 x" + area + " x " + "sin(" + elevationSunSummer + ") <br/>" +
                                "Cost of power generated = " + MTotal + " <span>&#247;</span> " + PPanelSummer;
        var htmlWinter="Winter Solstice <br/> " +
                      " The installation cost of the panels = £" + MTotal + " <br/>" +
                      " Assumed maximum noon-time power generation = " + PPanelWinter + "W <br/>" +
                      " Cost of power generated at this time = £" + powerCostWinter + " per Watt";
        var htmlWinterBreakdown="<br/> Installation cost = " + area + " x " + cost +"<br/>" +
                                "Power Generation = " + efficiency + " x 1000 x" + area + " x " + "sin(" + elevationSunWinter + ") <br/>" +
                                "Cost of power generated = " + MTotal + " <span>&#247;</span> " + PPanelWinter;
        $("#summerOutput").html(htmlSummer);
        $("#summerOutputBreakdown").html(htmlSummerBreakdown);
        $("#winterOutput").html(htmlWinter);
        $("#winterOutputBreakdown").html(htmlWinterBreakdown);
        // Validate the functions provided values else error on the page 
        if (MTotal && PPanelSummer && PPanelWinter && powerCostSummer && powerCostWinter){
          saveToDatabase(customer, roofAngle, efficiency, temperature, area, cost, elevationSunSummer, elevationSunWinter, PPanelSummer, PPanelWinter, MTotal, powerCostSummer, powerCostWinter);
          // Disable the submit button
          $("#submit").prop('disabled', true);
        } else {
          alert ("Error with calculation, try again");
        }
      };
    }
  });
});

function emptyFields(){
  if (!$("#customer").val()){
    console.log("ERROR - Customer is blank");
  }
  if (!$("#roofAngle").val()){
    console.log("ERROR - Roof Angle is blank");
  }
  if (!$("#sunAngle").val()){
    console.log("ERROR - Sun Angle is blank");
  }
  if (!$("#panelType").val()){
    console.log("ERROR - Panel Type is blank");
  }
  if (!$("#area").val()){
    console.log("ERROR - Roof Area is blank");
  }
  if (!$("#cost").val()){
    console.log("ERROR - Cost is blank");
  }
  else{
    console.log("SUCCESS - All fields filled successfully");
    return true;
}};

function getCustomerPostCode(id){
  // AJAX Call to database to get the customer postcode
  var checkValue = $.ajax({
    url: "resources/php/getCustomerDetails.php",
    type: 'post',
    data: {
      id:id
    },
    async: false
  }).responseText;
  if(checkValue=="N"){
    alert('This customer number does not exist!')
    return false;
  }
  else{
    return checkValue;
  }

}

function angleOfSun(postcode, season){
// Fetch angle of sun on the roof from postcode lon lat
// run lat lon to api to get roof angle midday
// Eroof is either 25 or 40
// Esun is either 60 or 15 (summer and winter respectively)
// Intialise the variable

}

function coefficient(temperature, efficiency){
// Efficiency decrease in % from temperature
// Find the difference in temperature
let tempDiff=temperature-25;
// The solar panels have a coefficient of about 0.45% from research/group wiki
let coefficient=tempDiff*0.45;
// The reduced efficiency is calculated
let reducedEff=(efficiency/100)*coefficient;
return efficiency-reducedEff;
}

function generateElevationAngleSunRoof(roofAngle,season){
let ESunRoof;
if (season=='summer'){
  ESunRoof=roofAngle+60;
} else if (season=='winter'){
  ESunRoof=roofAngle+15;
}
console.log("ESunRoof now = " + ESunRoof);
return ESunRoof
}

function generatePowerOfPanel(efficiency, power, area, season, roofAngle, temperature){

// Only run if temperature is above 25 as thats when efficiency decreases
if(temperature>=25){
  efficiency=coefficient(temperature, efficiency);
}
// Generates Power Output
//ESunRoof= angleOfSun('SY2 5LY', season);
ESunRoof=generateElevationAngleSunRoof(roofAngle,season);
// Convert to degrees because default math.sin uses radian https://dirask.com/posts/JavaScript-Math-sin-in-degrees-Z1AwNp
ESunRoof= (Math.PI / 180) * ESunRoof;
console.log("sin(85) = " + Math.sin(ESunRoof));
let PPanel = efficiency * power * area * Math.sin(ESunRoof);
console.log("PPanel = " + efficiency + "*" + power + "*" + area + "*" + Math.sin(ESunRoof));
console.log(season + " Power Output = " + PPanel)
return PPanel;
}

function generateInstallCost(area, cost){
// Generates total cost
return area*cost;
}

function generatePowerCost(power,totalCost){
return (totalCost/power).toFixed(2);
console.log("Cost of Power = "+ totalCost/power +"£/W");
};

function saveToDatabase(customer, roofAngle, efficiency, temperature, area, cost, elevationSunSummer, elevationSunWinter, PPanelSummer, PPanelWinter, MTotal, powerCostSummer, powerCostWinter){
  // AJAX insert
  console.log("Inserting into Database");
  var runInsert = $.ajax({
    url: "resources/php/powerGeneration.php",
    type: 'post',
    data: {
      id:customer,
      roofAngle: roofAngle,
      efficiency: efficiency,
      temperature: temperature,
      area: area,
      cost: cost,
      elevationSunSummer: elevationSunSummer,
      elevationSunWinter: elevationSunWinter,
      PPanelSummer: PPanelSummer,
      PPanelWinter:PPanelWinter,
      MTotal: MTotal,
      powerCostSummer: powerCostSummer,
      powerCostWinter:powerCostWinter
    },
    async: false
  }).responseText;
  console.log("Output is " + runInsert);
  if(runInsert=="N"){
    console.log("Error Inserting Query into Database!");
    alert ("Error Inserting into Database, seek system administrator!");
  }
  else{
    // Feedback to the people that it has worked?
  }
};