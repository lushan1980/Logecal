
$(document).ready(function () {

    //get Demographics all values table
    $.ajax({
        type: 'POST',
        url: "/VASValue/GetLumendiAllDemog",

        contentType: "application/json; charset=utf-8",
        success: function (data) {

            AllValues = JSON.parse(data);

            $.each(AllValues, function (index, value) {
                var row = $("<tr><td style='text-align: center' contenteditable='true'>" + value.UserID +
                    "</td><td style='text-align: center' contenteditable='true'>" + value.SubjID +
                    "</td><td style='text-align: center' contenteditable='true'>" + value.Age +
                    "</td><td contenteditable='true'>" + value.Gender +
                    "</td><td contenteditable='true'>" + value.RaceEthni +
                    "</td><td style='text-align: center'>" +
                    "<button type='button' class='button_icon'>" + "<i class='fa fa-pencil'></i>" + "</button>" +
                    "<button type='button' class='button_icon'>" + "<i class='fa fa-floppy-o'></i>" + "</button>" +
                    "<button type='button' class='button_icon'>" + "<i class='fa fa-trash'></i>" + "</button>" +                    
                    "</td><tr>");
                $("#table").append(row);
            });

        },
        error: function () {
            alert("Something got wrong");
        }
    });
})