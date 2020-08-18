$(document).ready(function () {
    
    $(function () {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const SurveyID = urlParams.get('SurveyID');
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

            var pwd = randPass(5, 3);

            var obj = {
                SurveyID: SurveyID,
                InviteCode: $('#User-code').val(),
                Email: $('#User-Email').val()                
            }

            var obj2 = {
                InviteCode: $('#User-code').val(),
                Email: $('#User-Email').val(),                
                Password: pwd
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
                        document.getElementById("btnSignup").style.display = "block";

                        //$.ajax({
                        //    type: "POST",
                        //    url: "/VASValue/UpdateVASUser",
                        //    dataType: "json",
                        //    data: JSON.stringify(obj2),
                        //    contentType: "application/json; charset=utf-8",
                        //    success: function (data) {
                        //        if (data.returnvalue) {
                        //            divPwdlabel = '<label for="User-Password" class="control__label control__label--is-required">Temporary Password</label>';
                        //            divPwdInput = '<input type = "password" class="control__input" id = "User-Password">';
                        //            divPwdMsg = '<p id="msg-password" style="color:#ff0000; margin:0px; font-style:italic"></p>';
                        //            $("#divPwd").append(divPwdlabel);
                        //            $("#divPwd").append(divPwdInput);
                        //            $("#divPwd").append(divPwdMsg);
                        //            document.getElementById("btnSubmit").style.display = "none";
                        //            document.getElementById("btnSubmit").disabled = true;
                        //            document.getElementById("btnSignin").style.display = "block";
                        //        }
                        //        else {
                        //            alert("wrong");
                        //        }
                        //    }
                        //})
                                                
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
                        var UserID = data.returnvalue;
                        window.location.replace(url + "?UserID=" + UserID)
                    } else {
                        alert("Your Email or Password are wrong");
                        Response.redirect(url)
                    }
                }
            })
        }

        function Signup() {            
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
                url: "/VASValue/InsertVASUser",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.returnvalue != null) {
                        alert("Success");
                        //var user = JSON.parse(data);
                        var UserID = data.returnvalue;
                        //var ID = user[0].ID;
                        window.location.replace(url + "?UserID=" + UserID)
                    } else {
                        alert("Your Email or Password are wrong");
                        Response.redirect(url)
                    }
                }
            })
        }

        function randPass(lettersLength, numbersLength) {
                var j, x, i;
                var result = '';
                var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                var numbers = '0123456789';
                for (i = 0; i < lettersLength; i++) {
                    result += letters.charAt(Math.floor(Math.random() * letters.length));
                }
                for (i = 0; i < numbersLength; i++) {
                    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
                }
                result = result.split("");
                for (i = result.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = result[i];
                    result[i] = result[j];
                    result[j] = x;
                }
                result = result.join("");
                return result
            }
    })
})



