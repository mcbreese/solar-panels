$(document).ready(function(){
  // Check the session is running and the customer profile is found
  checkSession();
  var customerID=checkSession();
  var customerData=returnData(customerID);
  // Check there is customer data returned from the database
  if(customerData){
    // Wait a second before returning data
    setTimeout(function() {
        addOptionsToPage(customerData);
    }, 500);
   
  }
  else {
    console.log("No Data Returned");
  };
});

// Check the session is active for the logged in customers
function checkSession(){
    var checkSession = $.ajax({
    url: "resources/php/customer-portal.php",
    type: 'post',
    data: {
      data: 'data'
    },
    async: false
  }).responseText;
  // If the session is empty then redirect the customer to the login screen
  if(!checkSession){
     window.location.href = "http://localhost/solar-panels/login.html";
  }
  else{

    console.log("============================================");
    console.log("Test Success - Customer details in database");
    console.log("============================================"); 
    return checkSession;
  };
};

// Return customer data from the database
function returnData(customerID) {
    var returnData = $.ajax({
    url: "resources/php/customer-portalData.php",
    type: 'post',
    dataType: 'JSON',
    data: {
      customerID: customerID
    },
    async: false
  }).responseText;
  returnData=JSON.parse(returnData);
  //If the session is empty then redirect the customer to the login screen
  if(!returnData){
     alert("The system administrators have not configured and quotes for your account yet!");
  }
  else{
    console.log("============================================");
    console.log("Test Success - Customer details returned");
    console.log("============================================");
    console.log(returnData);
    return returnData;
  };
}

  function find75Discharge(arr){
  var dischargeTimes=[];
  for(i=0; i<24; i++){
    if(arr[i]>=75){
      dischargeTimes.push(i+":00");
    }
  }
  return dischargeTimes;
};
  
function addOptionsToPage(customerData){
  htmlOutput=""
  for(i=0; i<customerData.length; i++){
    for(x=0;x<24;x++){
      // Make a new array and push the index as hours into it to display to the user
      if(customerData[i][5][x]<75){
        customerData[i][5].splice (customerData[i][5].indexOf([x]), 2);
      }
      else {
        customerData[i][5][x]=customerData[i][5][x]+":00";
      };
    }
    console.log(customerData[i][5]);
    // This is the output to display ont he page
    output="<h3>Option " + (i+1) + "</h3>"
    + "<p>1. Total expected power generation on the solstices at noon: " +customerData[i][0] + "W (summer)\t " + customerData[i][1] + "W (winter)</p>"
    + "<p>2. Total installation cost of this option : £" + customerData[0][2] + "</p>"
    + "<p>3. Total cost per watt as this rate : £/W " + customerData[0][3] + "W (summer)\t " + customerData[i][4] + "W (winter)</p>"
    + "<p>4. Hours battery will be more than 75% discharged NEED TO CONVERT ARRAYS </p>" 
    + "<p>5. Expected cost of telemetry on your system :" ;
    htmlOutput+=output
  }
  $("#options-output").html(htmlOutput);
};

[
  ["1494","964","1000","0.67","1.04",
  ["12.10","24.20","36.30","48.40","41.21","29.54","12.65","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","12.10","24.20","36.30"]
  ,["12.10","24.20","36.30","48.40","60.50","72.60","84.70","96.80","100.00","90.21","77.33","62.68","47.47","32.82","19.94","10.15","22.25","34.35","46.45","58.55","70.65","82.75","94.85","100.00"]
  ]
  ,["1449","750","1200","0.83","1.6"
  ,["12.10","24.20","36.30","48.40","48.07","42.89","31.84","15.50","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","12.10","24.20","36.30"]
  ,["12.10","24.20","36.30","48.40","60.50","72.60","84.70","96.80","100.00","96.87","90.34","81.83","72.68","64.18","57.65","54.52","66.62","78.72","90.82","100.00","100.00","100.00","100.00","100.00"]
  ]
]