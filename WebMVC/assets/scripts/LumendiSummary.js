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
                var row = $("<tr><td>" + value.SubjID + "</td><td>" + value.Age + "</td><td>" + value.Gender + "</td><td>" + value.RaceEthni + "</td></tr>");
                $("#table").append(row);
            });

        },
        error: function () {
            alert("Something got wrong");
        }
    });

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