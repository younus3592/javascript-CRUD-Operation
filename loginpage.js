

var loginPageObj = {
    validateUserNameAndPassword: function() {

        var  userName = $("#usernameInput").val();
        var password = $("#user-password").val();

        var isValid = true;

        $(".alert").hide();

        if(userName == null || userName == "") {
           $("#username-alert").show();
           isValid = false;
        }

        if(password == null || password == "") {
            $("#userpassword-alert").show();

            isValid = false;
         }


         if(isValid === false) {
            return;
         }

        $.ajax( {
            url: "logindetails.json",
            type: "GET",
            data: {username: userName , password: password},
            success: function(response) {

               var userObj =  response.find(function(currentObj) {
                      return currentObj.username.toLowerCase() === userName.toLowerCase() && 
                              currentObj.password === password;
                });

                if(userObj) {
                    window.location.href = "employeesList.html";
                } else{
                    $("#alert-div").show();
                }

            },
            err: function() {

            }
        })

    },
    submit: function() {

    }
}

$(function() {

    $("#btn-login").click(function() {
        loginPageObj.validateUserNameAndPassword();
    });

});