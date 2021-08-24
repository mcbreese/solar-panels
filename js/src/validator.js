function checkEmail(input){
// Create regex to test email against
// https://www.w3resource.com/javascript/form/email-validation.php
 const email= new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
// If the input is correct then continue
 if (email.test(input))
  {
    return (true)
  }
    return (false)

};

export {checkEmail};