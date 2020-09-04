$(document).ready(function () {

    $('#Signup').submit(function (event) {
        event.preventDefault();
        const SurveyID = getParameterByName('SurveyID');
        
        var i, inputs, messages;
        inputs = document.querySelectorAll('[id ^= "User-"]');
        messages = document.querySelectorAll('[id ^= "msg-"]');
        for (i = 0; i < inputs.length; i++) {
            messages[i].innerHTML = "";
        }
        for (i = 0; i < inputs.length; i++) {
            var isValid = true;
            var currentInputValue = inputs[i].value;
            if (currentInputValue == null || currentInputValue === "") {
                messages[i].innerHTML = "This field is required";
                isValid = false;
            }
        }
        if (!isValid) { return };

        var password = document.getElementById("User-Pwd")
            , confirm_password = document.getElementById("User-ConfirmPwd");

        if (password.value != confirm_password.value) {
            document.getElementById("msg-ConfirmPwd").innerHTML = "Password don't match"
            return false;
        }  


        var obj = {
            SurveyID: SurveyID,
            Email: $('#User-Email').val(),
            Password: $('#User-Pwd').val()
        }
        var url = "/VAS/Survey" + SurveyID;
        $.ajax({
            type: "POST",
            url: "/VASValue/InsertVASUser",
            dataType: "json",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.returnvalue !== "") {
                    //alert("Success");
                    //var user = JSON.parse(data);
                    var SubjID = data.returnvalue;
                    //var ID = user[0].ID;
                    window.location.replace(url + "?SubjID=" + SubjID)
                } else {
                    alert("You already have an account, please sign in directly.");
                }
            }
        })
    })
    

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    $(".toggle-password").click(function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
})
