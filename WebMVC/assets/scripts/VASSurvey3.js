$(document).ready(function () {
    $('#Study3').on('submit', function (event) {
        event.preventDefault();
        var gender = displayRadioValue('gender'),
            RaceEthni = displayRadioValue('RaceEthni')
            Random = displayRadioValue('Randomization');

        var object, url;

        object = {  
            Initials: $('#Initials').val(),
            Age: $('#age').val(),
            Gender: gender,
            RaceEthni: RaceEthni,
            Random: Random,
            Length: $('#Length').val(),
            Width: $('#Width').val(),
            TBegan: $('#Width').val(),
            TEnded: $('#Width').val(),
            TCeReached: $('#CecummReached').val(),
            TLeReached: $('#LesionReached').val()
        };
        url = "/VASValue/InsertStudy3";
        




        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: JSON.stringify(object),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.returnvalue) {
                    //alert("success");
                    $divButton.remove();
                    $("#section-Demog").remove();
                    $("#section-feeling").remove();
                    $("#section-AE").remove();
                    divSuccessMessage = '<p>Thank you for take part in our study</p>';
                    $("#SuccessMessage").append(divSuccessMessage);
                }
                else {
                    alert("Oops! Something got wrong");
                }
            }
        })
    })
    //fill age dropdown menu
    for (var i = 18; i <= 100; i++) {
        var select = document.getElementById("age");
        var option = document.createElement("OPTION");
        select.options.add(option);
        option.text = i;
        option.value = i;
    }
})