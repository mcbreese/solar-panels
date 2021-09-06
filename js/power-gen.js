// Struggled with JS promises so using global variables as a hack
var sunAngleSummer;
var sunAngleWinter;
var dateTimeString;

$(document).ready(function(){
  $("#submit").click(() => {
    // Check this customer exists in the database
    if (getCustomerPostCode($("#customer").val())){
      // Assign the postcode value to a variable for the API call
      var custPostcode = getCustomerPostCode($("#customer").val());
      custPostcode.trim;
      console.log("The customer postcode = " + custPostcode);
      // Test the page has all of the required information
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
        let elevationSunSummer=generateElevationAngleSunRoof(roofAngle,'summer', custPostcode);
        let elevationSunWinter=generateElevationAngleSunRoof(roofAngle,'winter', custPostcode);
        let PPanelSummer = Math.round(generatePowerOfPanel(efficiency,1000,area,'summer', roofAngle, temperature, custPostcode));
        let PPanelWinter = Math.round(generatePowerOfPanel(efficiency,1000,area, 'winter', roofAngle, temperature, custPostcode));
        let powerCostSummer = generatePowerCost(PPanelSummer, MTotal);
        let powerCostWinter = generatePowerCost(PPanelWinter, MTotal);
        // Prepare the HTML which will be output on the page
        var htmlSummer="<h3>Output</h3><p style='text-decoration: underline;'>Summer Solstice</p> <br/> " +
                      " The installation cost of the panels = £" + MTotal + " <br/>" +
                      " Assumed maximum noon-time power generation = " + PPanelSummer + "W <br/>" +
                      " Cost of power generated at this time = £" + powerCostSummer + " per Watt";
        var htmlSummerBreakdown="<h3>Breakdown</h3><p style='text-decoration: underline';>Summer Solstice</p></br>Installation cost = " + area + " x " + cost +"<br/>" +
                                "Power Generation = " + efficiency + " x 1000 x" + area + " x " + "sin(" + elevationSunSummer + ") <br/>" +
                                "Cost of power generated = " + MTotal + " <span>&#247;</span> " + PPanelSummer;
        var htmlWinter="<p style='text-decoration: underline;'>Winter Solstice</p><br/>" +
                      " The installation cost of the panels = £" + MTotal + " <br/>" +
                      " Assumed maximum noon-time power generation = " + PPanelWinter + "W <br/>" +
                      " Cost of power generated at this time = £" + powerCostWinter + " per Watt";
        var htmlWinterBreakdown="<p style='text-decoration: underline;'>Winter Solstice</p><br/> Installation cost = " + area + " x " + cost +"<br/>" +
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

// Attempt to get the api working, it's restrictive as can only get 2 weeks data. 
// Only current fix I can think of is duplicate the function and hard code summer and winter and call it from the generateElevationAngleSunRoof function
function angleOfSun(postcode, season){
    // Can't access season variable
    if(season=='summer'){
      dateTimeString="2021-09-10T12:00:00Z--2021-09-10T12:00:00Z";
    }if (season =='winter'){
      dateTimeString="2021-12-21T12:00:00Z--2021-12-21T12:00:00Z";
    };
    console.log(season);

    // Fetch latitude and longitude co-oridnates from an API
    fetch('http://api.getthedata.com/postcode/'+postcode).then(response => response.json()).then((data) => {
      latLon= [data.data.latitude,data.data.longitude];
    // Trial account for meteomatics, access the sun elevation angle at noon for it
    const credentials = btoa('uwebristol_breese:BmL3oUT7q8wPz');
    fetch('https://api.meteomatics.com/'+dateTimeString+':PT1H/sun_elevation:d/'+latLon[0]+','+latLon[1]+'/json', {method:'get', headers: {'Content-Type': 'application/json', 'Authorization': 'basic ' + credentials}}).then(response => response.json())
    .then((data) => {
                      let sunElev=data.data[0].coordinates[0].dates[0].value
                          console.log(dateTimeString);
                      console.log("Sun Elevation =" + sunElev);
                      // Assign to the global variable
                      if(dateTimeString==="2021-09-10T12:00:00Z--2021-09-10T12:00:00Z"){
                        sunAngleSummer=sunElev;
                      }if (dateTimeString ==="2021-12-21T12:00:00Z--2021-12-21T12:00:00Z"){
                        sunAngleWinter=sunElev;
                      };
                      
                      });
    });
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

function generateElevationAngleSunRoof(roofAngle,season,postcode){
// Get the angle of the sun at noon for that co-ordinate
//angleOfSun(postcode, season);
//console.log("Global Summer Angle = " + sunAngleSummer);
//console.log("Global Winter Angle = " + sunAngleWinter);
let ESunRoof;
if (season=='summer'){
  // Field input plus API call (albeit from September due to limitations of trial account)
  //ESunRoof=roofAngle+sunAngleSummer;
  ESunRoof=roofAngle+60;
} else if (season=='winter'){
  // Field input plus API call
  //ESunRoof=roofAngle+sunAngleWinter;
  ESunRoof=roofAngle+15;
}
return ESunRoof
}

function generatePowerOfPanel(efficiency, power, area, season, roofAngle, temperature, postcode){

// Only run if temperature is above 25 as thats when efficiency decreases
if(temperature>=25){
  efficiency=coefficient(temperature, efficiency);
}
// Generates Power Output
ESunRoof=generateElevationAngleSunRoof(roofAngle,season, postcode);
// Convert to degrees because default math.sin uses radian https://dirask.com/posts/JavaScript-Math-sin-in-degrees-Z1AwNp
ESunRoof= (Math.PI / 180) * ESunRoof;
let PPanel = efficiency * power * area * Math.sin(ESunRoof);
return PPanel;
}

function generateInstallCost(area, cost){
// Generates total cost
return area*cost;
}

function generatePowerCost(power,totalCost){
return (totalCost/power).toFixed(2);
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
  if(runInsert=="N"){
    console.log("Error Inserting Query into Database!");
    alert ("Error Inserting into Database, seek system administrator!");
  }
};