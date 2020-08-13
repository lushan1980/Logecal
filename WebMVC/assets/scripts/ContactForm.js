$(document).ready(function () {
    $('#ContactForm').on('submit', function (event) {

        event.preventDefault()

        var i, inputs, messages;
        inputs = document.querySelectorAll('[id ^= "contact-"]');
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

        var obj = new Object();

        var Message = {};
        Message.Name = $('#contact-name').val();
        Message.Email = $('#contact-email').val();
        Message.Phone = $('#contactphone').val();
        Message.Company = $('#contactcompany').val();
        Message.How = $('#contactreferral').val();
        Message.Questions = $('#contact-message').val();
        obj = Message;

        var url = window.location.pathname;
        var msg
        if (url == '/Home/Contact') {
            msg = '<h4>Thank you!</h4><p>We have received your request and will get back to you as soon as possible.</p>';
        }
        else if (url ='/Home/mailinglist') {
            msg = '<h4>Thank you!</h4><p>You have been signed up for our mailing list. Be sure to check your email for the latest product news and updates, as well as company news!</p>';
        };
        $.ajax({
            type: "POST",
            url: "/Message/InsertMsg",
            dataType: "json",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.returnvalue) {

                    $("#Formgird").remove();
                    $("#ContactForm").append(msg);
                }
                else {
                    alert("bad");
                }
            }
        })
        //error: function () {
        //    alert('Error');
        //}
    })
})