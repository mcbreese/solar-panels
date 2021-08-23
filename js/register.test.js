$(document).ready(function(){
  $("#submit").click(() => {
    emptyFields();
    passwordCheck();
  });
});

function emptyFields(){
if (!$("#email").val()){
  console.log("ERROR - Email is blank");
}
if (!$("#fname").val()){
  console.log("ERROR - First Name is blank");
}
if (!$("#lname").val()){
  console.log("ERROR - Last Name is blank");
}
if (!$("#password1").val()){
  console.log("ERROR - Password is blank");
}
if (!$("#password2").val()){
  console.log("ERROR - Repeat Password is blank");
}
if (!$("#postcode").val()){
  console.log("ERROR - Postcode is blank");
}
if (!$("#budget").val()){
  console.log("ERROR - Budget is blank");
}
else{
  console.log("SUCCESS - All fields filled successfully");
}

};

function passwordCheck(){
if ($("#password1").val()!=$("#password2").val()){
  console.log("ERROR - passwords don't equal the same");
}
else {
  console.log("SUCCESS - Passwords Match");
}
};

// database connection
// successful insert