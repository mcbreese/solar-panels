$(document).ready(function(){
  // Check the session is running and the customer profile is found
  checkSession();
  var customerID=checkSession();
  var customerBudget=checkBudget(customerID);
  var customerData=returnData(customerID);
  // Check there is customer data returned from the database
  if(customerData){
    // Display budget on the page
    $("#current-budget").html("Your current budget is set as £" +customerBudget);
    // Wait a second before returning data
    setTimeout(function() {
        addOptionsToPage(customerData, customerBudget);
        loadLineChart(linechartArr(customerData));
        loadBarChart(barChartArr(customerData));
    }, 500);
   
  }
  else {
    console.log("No Data Returned");
  };
  // Run function update budget if clicked
  $("#update-budget").click(() => {
    updateBudget($("#new-budget").val(), customerID);
  });
  // Run function sign-out if button is clicked
  $("#sign-out").click(() => {
    signOut();
  });
});

// Retrieve the customer budget from the database
function checkBudget(customerID){
// AJAX CALL
  var budget = $.ajax({
    url: "resources/php/getBudget.php",
    type: 'post',
    data: {
      customerID: customerID
    },
    async: false
  }).responseText;
  // If the session is empty then redirect the customer to the login screen
  if(!budget){
     alert("Error no budget found for customer!");
  } else {
    console.log("Budget = " +budget);
    return budget;
  }
};

function updateBudget(newBudget, customerID){
// AJAX CALL
  var budget = $.ajax({
    url: "resources/php/newBudget.php",
    type: 'post',
    data: {
      newBudget: newBudget,
      customerID: customerID
    },
    async: false
  }).responseText;
  if(budget){
     // Refresh page if budget updated
     window.location.reload();
  } else {
    alert("System Error");
  }
};

function signOut(){
  var signOut = $.ajax({
    url: "resources/php/sign-out.php",
    type: 'post',
    data: {
      data: 'data'
    },
    async: false
  }).responseText;
  // If the session is empty then redirect the customer to the login screen
  if(signOut){
     window.location.href = "http://localhost/solar-panels/login.html";
  }
}

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

// Put the discharge rates into an array which the google chart will be able to read
function linechartArr(arr){
  // Connfigure the headings of the chart
  let headingsArr=[['Time']];
  for(i=0; i<arr.length; i++){
    headingsArr[0].push("Opt " + [i+1] + " Summer");
    headingsArr[0].push("Opt " + [i+1] + " Winter");

  };
  // Failed to make this work automatically for n options so manually coded 2 options
  for(x=0; x<24; x++){
    headingsArr.push([[x]+":00",parseFloat(arr[0][5][x]), parseFloat(arr[0][6][x]),parseFloat(arr[1][5][x]), parseFloat(arr[1][6][x])]);
  }
  return headingsArr;
};

// Put the costs per watt into an array which the google chart will be able to read
function barChartArr(arr){
  // Connfigure the headings of the chart
  let headingsArr=[["Option/Season", "£/W", {role:"style"}]];
  for(i=0; i<arr.length; i++){
    headingsArr.push(["Option " + (i+1) + " Summer", parseFloat(arr[i][3]), "red"]);
    headingsArr.push(["Option " + (i+1) + " Winter", parseFloat(arr[i][4]), "blue"]);
  };
  return headingsArr;
};

// Add the data back to the webpage
function addOptionsToPage(customerData, budget){
  htmlOutput=""

  for(i=0; i<customerData.length; i++){
    let dischargeSummer=[];
    let dischargeWinter=[];
    let budgetHTML;
    budget=parseInt(budget);
    console.log(customerData[i][2]);
    if (customerData[i][2]>budget){
      budgetHTML="<span style='color:red'>Option is out of budget!</span>"
      // Option is out of budget
    } else {
       budgetHTML="<span style='color:green'>Option is within budget!</span>"
      // Option is in budget
    } ; 
    for(x=0;x<24;x++){
      // Make a new array and push the index as hours into it to display to the user
      if(customerData[i][5][x]>75){
        dischargeSummer.push(" "+[x]+":00 (" + customerData[i][5][x] + "%)");
      };
      if(customerData[i][6][x]>75){
        dischargeWinter.push(" "+[x]+":00 (" + customerData[i][6][x] + "%)");
      };
    }
    // This is the output to display ont he page
    output="<div class='options'><h3>Option " + (i+1) + "</h3>"
    + budgetHTML
    + "<p>1. Total expected power generation on the solstices at noon: " +customerData[i][0] + "W (summer)\t " + customerData[i][1] + "W (winter)</p>"
    + "<p>2. Total installation cost of this option : £" + customerData[i][2] + "</p>"
    + "<p>3. Total cost per watt as this rate : £/W " + customerData[i][3] + "W (summer)\t " + customerData[i][4] + "W (winter)</p>"
    + "<p>4. Hours battery will be more than 75% discharged:</p><p style='text-indent:10px'>  Summer: "+ dischargeSummer+ " </p><p style='text-indent:10px'>  Winter: " + dischargeWinter + "</p>" 
    + "<p>5. Expected cost of telemetry on your system: </div>" ;
    htmlOutput+=output
  }
  $("#options-output").html(htmlOutput);
};

// Load chart for the customer portal
function loadLineChart(chartArr){
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

// Load bar chart for customer portal
function loadBarChart(barArr){
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      console.log(barArr);
      var data = google.visualization.arrayToDataTable(barArr);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "£/W of Solar Panel Option",
        width: 900,
        height: 600,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
      chart.draw(view, options);
  }
};