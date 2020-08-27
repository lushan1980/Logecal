$(document).ready(function () {
    const UserID = getParameterByName('UserID');
    document.getElementById('subjID').innerHTML = "Subject ID: " + UserID;

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

    const Next = document.getElementById("lblNext");
    const Demog = document.getElementById("divDemog");
    const feeling = document.getElementById("divfeeling");
    const AE = document.getElementById("divAE");
    Next.addEventListener('click', function () {
        Demog.style.display = "none";
        feeling.style.display = "block";
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