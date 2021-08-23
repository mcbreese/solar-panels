
function angleOfSun(postcode){
// Fetch angle of sun on the roof from postcode lon lat
// Eroof is either 25 or 40
// Esun is either 60 or 15
let ESunRoof = 25+60;
return ESunRoof
}

function coefficient(temperature, efficiency){
// Efficiency decrease in % from temperature
}

function generateElevationAngleSunRoof(roofAngle,sunAngle){
// Generates elevation angle
}

function generatePowerOfPanel(efficiency, power, area, temperature){
// Only run if temperature is above 25 as thats when efficiency decreases
if(temperature>=25){
  coefficient(temperature, efficiency);
}
// Generates Power Output
ESunRoof= angleOfSun('SY2 5LY');
//ESunRoof= Math.sin(ESunRoof);
// Convert to degrees because default math.sin uses radian
// https://dirask.com/posts/JavaScript-Math-sin-in-degrees-Z1AwNp
ESunRoof= (Math.PI / 180) * ESunRoof;
console.log("sin(85) = " + Math.sin(ESunRoof));
let PPanel = efficiency * power * area * Math.sin(ESunRoof);
console.log("Power Output = " + PPanel)
return PPanel;
}

function generateInstallCost(area, cost){
// Generates total cost
return area*cost;
}

function generatePowerCost(power,totalCost){
console.log("Cost of Power = "+ totalCost/power +"£/W");
}


let PPanel = generatePowerOfPanel(0.2,1000,10);
let MTotal = generateInstallCost(10,100);
generatePowerCost(PPanel, MTotal);


