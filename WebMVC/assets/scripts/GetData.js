$(document).ready(function () {

    $.ajax({
        type: 'POST',
        url: "/VASValue/GetData",
        dataType: "json",
        //data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var AllValues = JSON.parse(data);

            AllValues = JSON.parse(data);

            $.each(AllValues, function (index, value) {
                var row = $("<tr><td>" + value.SubjID + "</td><td style='text-align: center'>" + value.Randomization + "</td><td>" + value.MonthProc + "</td><td>" + value.DProc + "</td><td>" + value.SurgeryTime + "</td></tr>");
                $("#table").append(row);
            });
        },
        error: function () {
            alert("Something got wrong");
        }
    })

})
