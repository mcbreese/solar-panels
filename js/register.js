$(document).ready(function(){
  $("#submit").click(() => {
    createCustomer();
  });
});

function createCustomer() {
  // Prep variables to post for the insert
  var fname = $("#fname").val();
  var lname = $("#lname").val();
  var password1 = $("#password1").val();
  var password2 = $("#password2").val();
  var email = $("#email").val();
  var postcode = $("#postcode").val();
  var budget = $("#budget").val();
  var runInsert = $.ajax({
    url: "resources/php/register.php",
    type: 'post',
    data: {
      fname: fname,
      lname: lname,
      password1: password1,
      password2: password2,
      email: email,
      postcode: postcode,
      budget: budget
    },
    async: false
  }).responseText;
  console.log(runInsert);
};