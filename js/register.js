$(document).ready(function(){
  console.log("this is working!");
  $("#submit").click(() => {
    createCustomer();
  });
});

function createCustomer() {
 console.log("Button Clicked!!");
  // Prep variables to post for the insert
  var fname = $("#fname").val();
  console.log(fname);
  var lname = $("#lanme").val();
  var password1 = $("#password1").val();
  var password2 = $("#password2").val();
  var email = $("#email").val();
  var postcode = $("#postcode").val();
  var budget = $("#budget").val();
  var runInsert = $.ajax({
    url: "register.php",
    type: 'post',
    data: {
      fname: fname,
      lname: lname,
      password1: password1,
      password2: password2,
      email: postcode,
      budget: budget
    },
    async: false
  }).responseText;
  console.log(runInsert);
  console.log("here");
};