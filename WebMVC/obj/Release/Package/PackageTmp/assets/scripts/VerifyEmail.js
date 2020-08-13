$(document).ready(function () {
    
    $(function () {

        var buttonpressed;
        $('.btn').click(function () {
            buttonpressed = $(this).attr('id')
        })
        $('#VerifyEmail').submit(function (event) {
            event.preventDefault();
            if (buttonpressed === "btnSubmit") {
                Submit();
            }
            else {
                Signin();
            }
        })
        function Submit () {
            //event.preventDefault();
            var isValid = true;
            if ($('#User-Email').val() == null || $('#User-Email').val() === "") {
                document.getElementById("msg-email").innerHTML = "This field is requied";
                isValid = false;
            }
            else { document.getElementById("msg-email").innerHTML = ""; };
            if (!isValid) { return };
            var pwd = randPass(5, 3);

            var obj = {
                Email: $('#User-Email').val(),
                Password: pwd
            }
        
            $.ajax({
                type: "POST",
                url: "/VASValue/InsertVASUser",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.returnvalue) {
                        divPwdlabel = '<label for="User-Password" class="control__label control__label--is-required">Temporary Password</label>';
                        divPwdInput = '<input type = "password" class="control__input" id = "User-Password">';
                        divPwdMsg = '<p id="msg-password" style="color:#ff0000; margin:0px; font-style:italic"></p>';
                        $("#divPwd").append(divPwdlabel);
                        $("#divPwd").append(divPwdInput);
                        $("#divPwd").append(divPwdMsg);
                        document.getElementById("btnSubmit").style.display = "none";
                        document.getElementById("btnSubmit").disabled = true;
                        document.getElementById("btnSignin").style.display = "block";
                    }
                    else {
                        alert("bad");
                    }
                }
            })
        }
        function Signin () {
            //event.preventDefault();
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
                Email: $('#User-Email').val(),
                Password: $('#User-Password').val()
            }
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const SurveyNum = urlParams.get('SurveyNum');
            var url = "/VAS/Survey"+SurveyNum;
            $.ajax({
                type: "POST",
                url: "/VASValue/CheckVASUser1",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data != "[]") {
                        var user = JSON.parse(data);
                        var ID = user[0].ID;
                        window.location.replace(url+"?ID="+ID)
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



