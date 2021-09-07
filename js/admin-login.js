$(document).ready(function () {
    // If submit it clicked then validate the fields
    $("#submit").click(() => {
        validator();
    });
});

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

function validator() {
    var email = $("#email").val().trim();
    var validEmail = checkEmail(email);
    var pass = $("#password").val();
    var error = 0;
    // Check fields aren't blank and if so assign error variable with 1
    if (email == "") {
        alert("Please enter your email");
        error = 1;
    }
    if (!validEmail) {
        alert("Email is an incorrect format");
        error = 1;
    }
    if (pass == "") {
        alert("Please enter your password");
        error = 1;
    }
    if (error === 0) {
        // If no errors then try and authenticate the login credentials
        authLogin(email, pass);
    }
}

function authLogin(email, pword) {
    var runLogin = $.ajax({
        url: "resources/php/admin-login.php",
        type: "post",
        data: {
            email: email,
            pword: pword,
        },
        async: false,
    }).responseText;
    console.log(runLogin);
    if (!runLogin) {
        $("#error").html("Incorrect login credentials, seek system administrator.");
    } else {
        setTimeout(function () {
            window.location.href = "http://localhost/solar-panels/power-gen.html";
        }, 1500);
    }
}
