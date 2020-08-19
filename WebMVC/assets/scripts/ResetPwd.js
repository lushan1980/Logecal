$(document).ready(function () {
    $(function () {
        var buttonpressed;
        $('.btn').click(function () {
            buttonpressed = $(this).attr('id')
        })
        $('#VerifyEmail').submit(function (event) {
            event.preventDefault();
            if (buttonpressed === "btnCancel") {
                window.location.replace(document.referrer)
            }
            else {
                Continue();
            }
        })

        function Continue() {
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

            //var SecurityCode = randPass(5, 3);

            var obj = {
                Email: $('#User-Email').val()
            }


            $.ajax({
                type: "POST",
                url: "/VASValue/SendEmailSecurityCode",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.returnvalue == "1") {
                        //alert("success");
                        divSecurityCode = '<label for="User-code" class="control__label control__label--is-required">Security Code</label><input type="text" class="control__input" id="User-VerifyCode"><p id="msg-VerifyCode" style="color:#ff0000; margin:0px; font-style:italic"></p><p style="color:black; margin:0px; font-style:italic">Just make sure it is you! We have sent a Email with a single use security code to you.Please check your Email now.</p>';
                        divNewPwd = '<label for="User-code" class="control__label control__label--is-required">New Password</label><input type="password" class="control__input" id="User-Pwd"><p id="msg-Email" style="color:#ff0000; margin:0px; font-style:italic"></p>';
                        divConfirmPwd = '<label for="User-code" class="control__label control__label--is-required">Confirm Password</label><input type ="password" class="control__input" id="User-ConfirmPwd"><p id="msg-Email" style="color:#ff0000; margin:0px; font-style:italic"></p>';

                        $("#divSecurityCode").append(divSecurityCode);
                        $("#divNewPwd").append(divNewPwd);
                        $("#divConfirmPwd").append(divConfirmPwd);
                        $("#btnContinue").remove();
                        
                        document.getElementById("btnSubmit").style.display = "block";
                    }
                    else {
                        alert("You were not invited to take part in this Survey!");
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