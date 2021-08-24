$(document).ready(function(){
  checkSession();
});

function checkSession(){
    var checkSession = $.ajax({
    url: "resources/php/customer-portal.php",
    type: 'post',
    data: {
      data: 'data'
    },
    async: false
  }).responseText;
  console.log(checkSession);
};