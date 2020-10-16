$(document).ready(function () {

    const SurveyID = getParameterByName('SurveyID'),
          StudyName = getParameterByName('StudyName');
    var url = "/VAS/Survey" + SurveyID;

    document.getElementById('BannerContent').innerHTML = StudyName;
    var buttonpressed;
    $('.btn').click(function () {
        buttonpressed = $(this).attr('id')
    })
    $('#Signin').submit(function (e) {
        e.preventDefault();
        if (buttonpressed === "btnSignin") {
            Signin();
        }
        else {
            Signup();
        }
    })

    //document.getElementById('User-Administrator').addEventListener('change', function(event) {
    //    if (event.target.checked) {
    //        document.getElementById('User-Administrator').value = "Admin";
    //    } else {
    //        document.getElementById('User-Administrator').value = "User";
    //    }
    //})

    function Signin() {
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

        var obj = {
            SurveyID: SurveyID,
            Email: $('#User-Email').val(),
            Administrator: $('#User-Administrator').val(),
            Password: $('#User-Password').val()
        }

        if (SurveyID === "3") {
            $.ajax({
                type: "POST",
                url: "/VASValue/CheckLumendiUser",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.returnvalue != "") {
                        var UserID = data.returnvalue;
                        window.location.replace("/VAS/Survey" + SurveyID + "?SurveyID=" + SurveyID + "&UserID=" + UserID + "&StudyName=" + StudyName)
                    } else {
                        alert("Your Email or Password are wrong! ");
                    }
                }
            })
        }
        else {
            $.ajax({
                type: "POST",
                url: "/VASValue/CheckVASUser",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.returnvalue != "") {
                        var SubjID = data.returnvalue;
                        window.location.replace(url + "?SubjID=" + SubjID)
                    } else {
                        alert("Your Email or Password are wrong");
                        Response.redirect(url)
                    }
                }
            })
        }
    }

    function Signup() {
        var urlSignup = "/VAS/Signup?SurveyID=" + SurveyID + '&StudyName=' + StudyName;
        window.location.replace(urlSignup)
    }

    $('#forgetlink').on('click', function (e) {
        e.preventDefault();
        window.location.replace('/VAS/ResetPwd' + '?SurveyID=' + SurveyID + '&StudyName=' + StudyName)
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

})



