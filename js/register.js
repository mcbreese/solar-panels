$(document).ready(function () {
    // If submit it clicked then validate the fields
    $("#submit").click(() => {
        validator();
    });
});

function checkPword(input) {
    // To check a password between 7 to 15 characters which contain at least one numeric digit and a special character
    // https://w3resource.com/javascript/form/password-validation.php
    // Create regular expression to validate the password format
    const paswd = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{7,15}$/);
    // If the password is empty fill it with data that will also fail
    if (!input) {
        input = "fail";
    }
    if (paswd.test(input)) {
        return true;
    } else {
        console.log("Test");
        alert("Wrong password format!");
        return false;
    }

    // Check in validator function
}

function checkEmail(input) {
    // Create regex to test email against
    // https://www.w3resource.com/javascript/form/email-validation.php
    const email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    // If the input is correct then continue
    if (email.test(input)) {
        return true;
    }
    return false;
}

function checkPcode(input) {
    // Create regex to test postcode against
    // Restricted to UK postcode
    // https://www.qodo.co.uk/blog/javascript-check-if-a-uk-postcode-is-valid/
    const pcode = new RegExp(/[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i);
    // If the input is correct then continue
    if (pcode.test(input)) {
        return true;
    }
    return false;
}

function validator() {
    // Check password properties
    let validPword = checkPword($("#password1").val());
    let validEmail = checkEmail($("#email").val());
    let validPcode = checkPcode($("#postcode").val());
    // Define a variable for errors and don't run insert if = 1
    let error = 0;
    // Reject if fields are not valid
    if ($("#fname").val().length > 50 || $("#lname").val().length > 50) {
        alert("First or Last Name Exceeds the character limit!!");
        error = 1;
    }
    // If password doesn't meet requirements then don't insert
    if (!validPword) {
        alert("Password does not follow the correct format");
        error = 1;
    }
    // If passwords don't match then alert and fail
    if ($("#password1").val() != $("#password2").val()) {
        alert("Passwords don't match!");
        error = 1;
    }
    // If email isn't correct format then fail
    if (!validEmail) {
        alert("Email incorrect format");
        error = 1;
    }
    // If postcode isn't correct format then fail
    if (!validPcode) {
        alert("Postcode incorrect format");
        error = 1;
    }
    // If no data errors then run the insert
    if (error === 0) {
        createCustomer();
    }
}

// Customer Insert into database, connects to PHP back end script
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
        type: "post",
        data: {
            fname: fname,
            lname: lname,
            password1: password1,
            password2: password2,
            email: email,
            postcode: postcode,
            budget: budget,
        },
        async: false,
    }).responseText;
    console.log(runInsert);
    // If the insert fails for whatever reason then display the output message
    if (runInsert != "Y") {
        $("#error-area").html(runInsert);
    } else {
        // If it is successful then show a loading circle and the redirect
        $("#error-area").addClass("loader");
        setTimeout(function () {
            window.location.href = "http://localhost/solar-panels/login.html";
        }, 1500);
    }
}
