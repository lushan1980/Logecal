$(document).ready(function () {

    $(function () {

        const SurveyID = getParameterByName('SurveyID');
        var url = "/VAS/Survey" + SurveyID;

        var buttonpressed;
        $('.btn').click(function () {
            buttonpressed = $(this).attr('id')
        })
        $('#Signin').submit(function (event) {
            event.preventDefault();
            if (buttonpressed === "btnSignin") {
                Signin();
            }
            else {
                Signup();
            }
        })

        document.getElementById('User-Administrator').addEventListener('change', function(event) {
            if (event.target.checked) {
                document.getElementById('User-Administrator').value = "Admin";
            } else {
                document.getElementById('User-Administrator').value = "User";
            }
        })

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
                        if (data.returnvalue[0].Administrator.replace(/\s+/g, "") == "Admin") {
                            var UserID = data.returnvalue[0].UserID;
                            window.location.replace("/VAS/Admin" + "?SurveyID=" + SurveyID)
                        } else if (data.returnvalue[0].Administrator.replace(/\s+/g, "") == "User") {
                            var UserID = data.returnvalue[0].UserID;
                            window.location.replace(url + "?UserID=" + UserID)
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
            var urlSignup = "/VAS/Signup?SurveyID=" + SurveyID;
            window.location.replace(urlSignup)
        }

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
})



