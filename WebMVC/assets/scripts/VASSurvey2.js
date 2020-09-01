$(document).ready(function () {

    const SubjID = getParameterByName('SubjID');
    document.getElementById('subjID').innerHTML = "Subject ID: " + SubjID;

    var obj = { SubjID: SubjID };

    var $curr = $("#section-Demog");
    var $first = $("#section-Demog");
    var $last;
    const Previous = document.getElementById("btnPrevious");
    const Next = document.getElementById("btnNext");
    const Visit0 = document.getElementById("Visit0"),
        Visit1 = document.getElementById("Visit1"),
        Visit2 = document.getElementById("Visit2"),
        Visit3 = document.getElementById("Visit3"),
        Visit4 = document.getElementById("Visit4");

    var i, Visits;
    Visits = document.querySelectorAll('[id ^= "Visit"]');
    //Check how many visits this is
    $.ajax({
        type: "POST",
        url: "/VASValue/CheckexistsSubj",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            switch (data.returnvalue) {
                case "":
                    //alert("Baseline");
                    $last = $("#section-feeling");
                    for (i = 1; i < Visits.length; i++) {                    
                        Visits[i].className = "isDisabled";
                    }
                    break;
                case "1":
                    //alert("Week 1")
                    $last = $("#section-AE");
                    for (i = 2; i < Visits.length; i++) {
                        Visits[i].className = "isDisabled";
                    }                               

                    $.ajax({
                        type: "POST",
                        url: "/VASValue/GetStudy2Demog",
                        dataType: "json",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            //alert("It has that record");
                            var Demog = JSON.parse(data);
                            var thisAge = Demog[0].Age,
                                thisGender = myTrim(Demog[0].Gender),
                                thisEthnicity = myTrim(Demog[0].Ethnicity),
                                thisRace = myTrim(Demog[0].Race),
                                thisAssessment = parseFloat(Demog[0].Assessment);

                            document.getElementById('age').value = thisAge;
                            document.getElementById("myRange").value = thisAssessment

                            if (thisGender == "male") {
                                document.getElementById('male').checked = true;
                            }
                            else {
                                document.getElementById('female').checked = true;
                            }

                            if (thisEthnicity == "hispanic or latino") {
                                document.getElementById('HoL').checked = true;
                            }
                            else {
                                document.getElementById('NHoL').checked = true;
                            }

                            switch (thisRace) {
                                case "white":
                                    document.getElementById('White').checked = true;
                                    break;
                                case "black or african american":
                                    document.getElementById('Black').checked = true;
                                    break;
                                case "asian":
                                    document.getElementById('Asian').checked = true;
                                    break;
                                case "native hawaiian or other pacific islander":
                                    document.getElementById('Hawaiian').checked = true;
                                    break;
                                case "other":
                                    document.getElementById('Other').checked = true;
                                    break;
                            }                           

                        }
                    });
                    document.getElementById("section-Demog").classList.add("isDisabled")
                    
                    break;
                case "2":
                    //alert("Week 2");
                    $last = $("#section-AE");
                    for (i = 3; i < Visits.length; i++) {
                        Visits[i].className = "isDisabled";
                    }
                    document.getElementById("section-Demog").classList.add("isDisabled")
                    break;
                case "3":
                    //alert("Week 3")
                    $last = $("#section-AE");
                    for (i = 4; i < Visits.length; i++) {
                        Visits[i].className = "isDisabled";
                    }
                    document.getElementById("section-Demog").classList.add("isDisabled")
                    break;
                case "4":
                    alert("Week 4")
                    $last = $("#section-AE");
                    document.getElementById("section-Demog").classList.add("isDisabled")
                    break;
            }
        }
    })

    Previous.addEventListener('click', function (e) {
        e.preventDefault();
        $curr.css("display", "none");
        $curr = $curr.prev();
        $("section").css("display", "none");
        $("#btnSubmit").css("display", "none");
        $("#btnNext").css("display", "block");
        if ($curr.is($first)) {
            $("#btnPrevious").css("display", "none");
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
    Visit0.addEventListener('click', function (e) {
        e.preventDefault(); 
        document.getElementById("section-feeling").classList.add("isDisabled")
    })
    Visit1.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById("section-feeling").classList.remove("isDisabled")

    })
    Visit2.addEventListener('click', function (e) {
        e.preventDefault();
    })
    Visit3.addEventListener('click', function (e) {
        e.preventDefault();
    })
    Visit4.addEventListener('click', function (e) {
        e.preventDefault();
    })
    $('#Study2').on('submit',function (event) {
        event.preventDefault();
        var gender = displayRadioValue('gender'),
            Ethnicity = displayRadioValue('ethnicity'),
            Race = displayRadioValue('race');
        var sliderValue = document.getElementById("myRange").value;    

        var object = {
            SubjID: SubjID,
            Age: $('#age').val(),
            Gender: gender,
            Ethnicity: Ethnicity,
            Race: Race,
            Assessment: sliderValue
        };

        $.ajax({
            type: "POST",
            url: "/VASValue/InsertStudy2",
            dataType: "json",
            data: JSON.stringify(object),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.returnvalue) {
                    alert("success");
                }
                else {
                    alert("bad");
                }
            }
    })


    })

    //get url parameter
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    //fill age dropdown menu
    for (var i = 18; i <= 100; i++) {
        var select = document.getElementById("age");
        var option = document.createElement("OPTION");
        select.options.add(option);
        option.text = i;
        option.value = i;
    }

    //get radio value
    function displayRadioValue(name) {
        var ele = document.getElementsByName(name);
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                var val = ele[i].value;
        }
        return val;
    }   
    //remove before and after space and lower case character
    function myTrim(x) {
        return x.replace(/^\s+|\s+$/gm, '').toLowerCase();
    }
})