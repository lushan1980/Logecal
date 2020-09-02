$(document).ready(function () {

    const SubjID = getParameterByName('SubjID');
    document.getElementById('subjID').innerHTML = "Subject ID: " + SubjID;

    var obj = { SubjID: SubjID };

    var $curr = $("#section-Demog");
    var $first = $("#section-Demog");
    var $divButton = $("#divButton");
    var $last;
    const Previous = document.getElementById("btnPrevious");
    const Next = document.getElementById("btnNext");
    const Visit0 = document.getElementById("Visit0"),
        Visit1 = document.getElementById("Visit1"),
        Visit2 = document.getElementById("Visit2"),
        Visit3 = document.getElementById("Visit3"),
        Visit4 = document.getElementById("Visit4");
    var VisitTime;
    var i, Visits, AllValues, thisAge, thisGender, thisEthnicity, thisRace, BaselineAssessment,
        Week1Assessment, Week2Assessment, Week3Assessment, Week4Assessment;
    Visits = document.querySelectorAll('[id ^= "Visit"]');

    function NotFirstVisit() {
        $last = $("#section-AE");
        $.ajax({
            type: "POST",
            url: "/VASValue/GetStudy2AllValue",
            dataType: "json",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                AllValues = JSON.parse(data);

                thisAge = AllValues[0].Age,
                thisGender = myTrim(AllValues[0].Gender),
                thisEthnicity = myTrim(AllValues[0].Ethnicity),
                thisRace = myTrim(AllValues[0].Race),
                BaselineAssessment = parseFloat(AllValues[0].Assessment);

                document.getElementById('age').value = thisAge;
                //document.getElementById("myRange").value = BaselineAssessment

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
    }

    //Check how many visits this is
    $.ajax({
        type: "POST",
        url: "/VASValue/CheckexistsSubj",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            switch (data.returnvalue) {
                case "0":
                    //alert("Baseline");
                    $last = $("#section-feeling");
                    for (i = 1; i < Visits.length; i++) {                    
                        Visits[i].className = "isDisabled";
                    }
                    break;
                case "1":
                    //alert("Week 1")
                    for (i = 2; i < Visits.length; i++) {
                        Visits[i].className = "isDisabled";
                    }
                    NotFirstVisit();                    
                    break;
                case "2":
                    //alert("Week 2");                    
                    for (i = 3; i < Visits.length; i++) {
                        Visits[i].className = "isDisabled";
                    }
                    NotFirstVisit();   
                    break;
                case "3":
                    //alert("Week 3")
                    $last = $("#section-AE");
                    for (i = 4; i < Visits.length; i++) {
                        Visits[i].className = "isDisabled";
                    }
                    NotFirstVisit();   
                    break;
                case "4":
                    //alert("Week 4")
                    NotFirstVisit();   
                    break;
            }
            VisitTime = parseInt(data.returnvalue) + 1; 
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
        
        var thisAge = AllValues[0].Age,
            thisGender = myTrim(AllValues[0].Gender),
            thisEthnicity = myTrim(AllValues[0].Ethnicity),
            thisRace = myTrim(AllValues[0].Race),
            thisVisitNo = AllValues[0].VisitNo,
            thisAssessment = parseFloat(AllValues[0].Assessment);        
        document.getElementById("myRange").value = thisAssessment
        $("#section-AE").css("display", "none");
        document.getElementById("section-feeling").classList.add("isDisabled")
        $("#btnSubmit").css("display", "none");
    })
    Visit1.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-AE").css("display", "inline-flex");
        $("#btnSubmit").css("display", "block");
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
        var AEDiscription1 = document.getElementById("AdventEvent1").value,
            AEDiscription2 = document.getElementById("AdventEvent2").value,
            AEDiscription3 = document.getElementById("AdventEvent3").value,
            AEDiscription4 = document.getElementById("AdventEvent4").value;
        var severity1 = displayRadioValue('SEVERITY1'),
            severity2 = displayRadioValue('SEVERITY2'),
            severity3 = displayRadioValue('SEVERITY3'),
            severity4 = displayRadioValue('SEVERITY4');

        var object, url;
        
        if (VisitTime == 1) {
            object = {
                SubjID: SubjID,
                Age: $('#age').val(),
                Gender: gender,
                Ethnicity: Ethnicity,
                Race: Race,
                Assessment: sliderValue
            };
            url = "/VASValue/InsertStudy2first";
        }
        else {
            object = {
                SubjID: SubjID,
                VisitNo: VisitTime,
                Assessment: sliderValue,
                AEDiscription1: AEDiscription1,
                Severity1: severity1,
                AEDiscription2: AEDiscription2,
                Severity2: severity2,
                AEDiscription3: AEDiscription3,
                Severity3: severity3,
                AEDiscription4: AEDiscription4,
                Severity4: severity4
            };
            var a = object;
            url = "/VASValue/InsertStudy2";
        }        

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
                    $last.remove();
                    divSuccessMessage = '<p>Thank you for take part in our study</p>';
                    $("#SuccessMessage").append(divSuccessMessage);
                }
                else {
                    alert("Oops! Something got wrong");
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
        var val ="";
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                val = ele[i].value            
        }
        return val;
    }   
    //remove before and after space and lower case character
    function myTrim(x) {
        return x.replace(/^\s+|\s+$/gm, '').toLowerCase();
    }
})