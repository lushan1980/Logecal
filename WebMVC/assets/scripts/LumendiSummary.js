$(document).ready(function () {

    const UserID = getParameterByName('UserID');;
    obj = { UserID: UserID };  

    $.ajax({
        type: 'POST',
        url: "/VASValue/CountSubj",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            var SubjNum = data.returnvalue;
            var a = SubjNum;
            document.getElementById("SubjNum").value = SubjNum;


        },
        error: function () {
            alert("Something got wrong");
        }
    });
    $.ajax({
        type: 'POST',
        url: "/VASValue/GetLumendiDemog",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            AllValues = JSON.parse(data);

            $.each(AllValues, function (index, value) {
                var row = $("<tr><td>" + value.SubjID + "</td><td style='text-align: center'>" + value.Age + "</td><td>" + value.Gender + "</td><td>" + value.RaceEthni + "</td></tr>");
                $("#table").append(row);
            });

        },
        error: function () {
            alert("Something got wrong");
        }
    });
    $.ajax({
        type: 'POST',
        url: "/VASValue/SummaryDemog",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var AllValues = JSON.parse(data);
            var Age = AllValues.filter(function (entry) {
                return entry.Parameter1 === "Age";
            })
            var Gender = AllValues.filter(function (entry) {
                return entry.Parameter1 === "Gender";
            }) 
            var RaceEthni = AllValues.filter(function (entry) {
                return entry.Parameter1 === "Race/Ethnicity";
            }) 
            $.each(Age, function (index, value) {
                var row = $("<tr><td style='text-align: center'>" + value.Control + "</td><td style='text-align: center'>" + value.Device + "</td><td style='text-align: center'>" + value.Overall + "</td></tr>");
                $("#SummaryAge").append(row);
            });
            $.each(Gender, function (index, value) {
                var row = $("<tr><td>" + value.Parameter2 + "</td><td style='text-align: center'>" + value.Control + "</td><td style='text-align: center'>" + value.Device + "</td><td style='text-align: center'>" + value.Overall + "</td></tr>");
                $("#SummaryGender").append(row);
            });
            $.each(RaceEthni, function (index, value) {
                var row = $("<tr><td>" + value.Parameter2 + "</td><td style='text-align: center'>" + value.Control + "</td><td style='text-align: center'>" + value.Device + "</td><td style='text-align: center'>" + value.Overall + "</td></tr>");
                $("#SummaryRaceEthni").append(row);
            });
        },
        error: function () {
            alert("Something got wrong");
        }
    });

    const Return = document.getElementById('return');
    Return.addEventListener('click', function (e) {
        e.preventDefault;
        window.location.replace("/VAS/Survey3" + "?UserID=" + UserID)
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