$(document).ready(function () {

    const SubjID = getParameterByName('SubjID');
    document.getElementById('subjID').innerHTML = "Subject ID: " + SubjID;

    var obj = {
        SubjID: SubjID
    };

    $.ajax({
        type: "POST",
        url: "/VASValue/CheckexistsSubj",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.returnvalue != "") {
                alert("Not First Visit");
            } else {
                alert("First visit"); 
                var i, Visits;
                Visits = document.querySelectorAll('[id ^= "Visit"]');
                for (i = 1; i < Visits.length; i++) {                    
                    Visits[i].className = "isDisabled";
                }
                return true;
            }
        }
    })

    for (var i = 18; i <= 100; i++) {
        var select = document.getElementById("age");
        var option = document.createElement("OPTION");
        select.options.add(option);
        option.text = i;
        option.value = i;
    }
    
    function displayRadioValue(name) {        
        var ele = document.getElementsByName(name);
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                var val = ele[i].value;
        }
        return val;
    }   

    var gender = displayRadioValue('gender'),
        Ethnicity = displayRadioValue('Ethnicity'),
        Race = displayRadioValue('Race');

    const Previous = document.getElementById("btnPrevious");
    const Next = document.getElementById("btnNext");

    var $curr = $("#section-Demog");
    var $first = $("#section-Demog");
    var $last = $("#section-AE");

    Previous.addEventListener('click', function (e) {
        e.preventDefault();
        $curr.css("display", "none");
        $curr = $curr.prev();
        $("section").css("display", "none");
        if ($curr.is($first)) {
            $("#btnPrevious").css("display", "none");
            $("#btnSubmit").css("display", "none");
            $("#btnNext").css("display", "block");
        }
        $curr.css("display", "inline-flex");
    })           
    Next.addEventListener('click', function (e) {
        e.preventDefault();    
        $("#btnPrevious").css("display", "block");
        $curr.css("display", "none");
        $curr = $curr.next();
        $("section").css("display", "none");
        if ($curr.is($last)) {
            $("#btnSubmit").css("display", "block");
            $("#btnNext").css("display", "none");
        }
        $curr.css("display", "inline-flex");
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