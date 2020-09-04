$(document).ready(function () {
    
    $(function () {
        //const queryString = location.search;        
        //const urlParams = new URLSearchParams(queryString);
        //const SurveyID = urlParams.get('SurveyID');

        const SurveyID = getParameterByName('SurveyID');;
        var url = "/VAS/Survey" + SurveyID;

        var buttonpressed;
        $('.btn').click(function () {
            buttonpressed = $(this).attr('id')
        })
        $('#VerifyEmail').submit(function (event) {
            event.preventDefault();
            if (buttonpressed === "btnVerify") {
                Verify();
            }
            else if (buttonpressed === "btnSignin") {
                Signin();
            }
            else {
                Signup();
            }
        })

        function Verify () {

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
                InviteCode: $('#User-code').val()           
            }

        
            $.ajax({
                type: "POST",
                url: "/VASValue/CheckInviteCode",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data.returnvalue) {
                        //alert("success");
                        document.getElementById("head1").innerHTML = "Welcome to take part in our Survey";
                        document.getElementById("head2").innerHTML = "If you do not have an account, please sign up first. If you are an existing user, please enter your Email and password then Login. ";
                        $("#divVerifyCode").remove();
                        divEmailLabel = '<label for="User-Email" class="control__label control__label--is-required">Email Address</label>';
                        divEmailInput = '<input type="email" class="control__input" id="User-Email">';
                        divEmailMsg = '<p id="msg-email" style="color:#ff0000; margin:0px; font-style:italic"></p>';
                        divPwdLabel = '<label for="User-Password" class="control__label control__label--is-required">Password</label>';
                        divPwdInput = '<input type = "password" class="control__input" id = "User-Password">';
                        divPwdMsg = '<p id="msg-password" style="color:#ff0000; margin:0px; font-style:italic"></p>';
                        $("#divEmail").append(divEmailLabel);
                        $("#divEmail").append(divEmailInput);
                        $("#divEmail").append(divEmailMsg);
                        $("#divPwd").append(divPwdLabel);
                        $("#divPwd").append(divPwdInput);
                        $("#divPwd").append(divPwdMsg);
                        document.getElementById("btnVerify").style.display = "none";
                        document.getElementById("btnVerify").disabled = true;
                        document.getElementById("btnSignin").style.display = "block";
                        document.getElementById("forgetlink").style.display = "block";
                        document.getElementById("btnSignup").style.display = "block";
                                                
                    }
                    else {
                        alert("You were not invited to take part in this Survey!");
                    }
                }
            })
        }

        function Signin () {
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
                Password: $('#User-Password').val()
            }
            
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

        function Signup() {   
            var urlSignup = "/VAS/Signup?SurveyID="+SurveyID;
            window.location.replace(urlSignup)

            //var i, inputs, messages;
            //inputs = document.querySelectorAll('[id ^= "User-"]');
            //messages = document.querySelectorAll('[id ^= "msg-"]');
            //for (i = 0; i < inputs.length; i++) {
            //    messages[i].innerHTML = "";
            //}
            //for (i = 0; i < inputs.length; i++) {
            //    var isValid = true;
            //    var currentInputValue = inputs[i].value;
            //    if (currentInputValue == null || currentInputValue === "") {
            //        messages[i].innerHTML = "This field is required";
            //        isValid = false;
            //    }
            //}
            //if (!isValid) { return };

            //var obj = {
            //    SurveyID: SurveyID,
            //    Email: $('#User-Email').val(),
            //    Password: $('#User-Password').val()
            //}

            //$.ajax({
            //    type: "POST",
            //    url: "/VASValue/InsertVASUser",
            //    dataType: "json",
            //    data: JSON.stringify(obj),
            //    contentType: "application/json; charset=utf-8",
            //    success: function (data) {
            //        if (data.returnvalue !== "") {
            //            //alert("Success");
            //            //var user = JSON.parse(data);
            //            var UserID = data.returnvalue;
            //            //var ID = user[0].ID;
            //            window.location.replace(url + "?UserID=" + UserID)
            //        } else {
            //            alert("You already have an account, please sign in directly.");                        
            //        }
            //    }
            //})
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



