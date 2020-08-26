$(document).ready(function () {
    for (var i = 18; i <= 80; i++) {
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

    var gender = displayRadioValue(document.getElementsByName('gender')),
        Ethnicity = displayRadioValue(document.getElementsByName('Ethnicity')),
        Race = displayRadioValue(document.getElementsByName('Race'))




})