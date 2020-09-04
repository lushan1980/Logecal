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

    var VisitTime;
    var WeekAssessments = [];

    var AllValues, thisAge, thisGender, thisEthnicity, thisRace;

    var Visits = document.querySelectorAll('[id ^= "Visit"]');
    var AdventEvents = document.querySelectorAll('[id ^= "AdventEvent"]'),
        Milds = document.querySelectorAll('[id ^= "Mild"]'),
        Moderates = document.querySelectorAll('[id ^= "Moderate"]'),
        Severes = document.querySelectorAll('[id ^= "Severe"]');

    document.getElementById("No").addEventListener('click', function () {
        for (var i = 0; i < AdventEvents.length; i++) {
            AdventEvents[i].value = "";
            Milds[i].checked = false;
            Moderates[i].checked = false;
            Severes[i].checked = false;
        }
        document.getElementById("divAEtable").classList.add("isDisabled");
    })
    document.getElementById("Yes").addEventListener('click', function () {
        document.getElementById("divAEtable").classList.remove("isDisabled");
    })
    
    //Check how many visits this is
    $.ajax({
        type: "POST",
        url: "/VASValue/CheckexistsSubj",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            VisitTime = parseInt(data.returnvalue);  
            var i;
            switch (data.returnvalue) {                
                case "0":
                    //alert("Baseline");
                    $last = $("#section-feeling");
                    for (i = 1; i < Visits.length; i++) {                    
                        Visits[i].className = "isDisabled";
                    }
                    break;
                case "1":
                    for (i = 2; i < Visits.length; i++) {
                        Visits[i].className = "isDisabled";
                    }
                    NotFirstVisit();                    
                    break;
                case "2":                 
                    for (i = 3; i < Visits.length; i++) {
                        Visits[i].className = "isDisabled";
                    }
                    NotFirstVisit();  
                     break;
                case "3":
                    for (i = 4; i < Visits.length; i++) {
                        Visits[i].className = "isDisabled";
                    }
                    NotFirstVisit(); 
                    break;
                case "4":
                    NotFirstVisit();  
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
        if (temp < VisitTime) {
            $("#btnSubmit").css("display", "none");
            if (temp == 0) {
                $("#section-AE").css("display", "none");            
            }            
        }
    }) 

    var temp;
    Visits.forEach(function (Visit, index) {
        Visit.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById("myRange").value = WeekAssessments[index];
            getAEs(index + 1);
            $("#section-feeling").removeClass("isDisabled")
            $("#section-AE").removeClass("isDisabled")
            $("#section-Demog").css("display", "inline-flex");
            $("#section-feeling").css("display", "none");
            $("#section-AE").css("display", "none");
            $("#btnPrevious").css("display", "none");
            $("#btnNext").css("display", "block");
            $("#btnSubmit").css("display", "none");
            $curr = $("#section-Demog");
            if (index < VisitTime) {
                $("#section-feeling").addClass("isDisabled")
                $("#section-AE").addClass("isDisabled")
            }
        temp = index;
        })
        
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
        
        if (VisitTime == 0) {
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

    //Not First Visit function
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
                getAllAssessment();

                thisAge = AllValues[0].Age,
                    thisGender = myTrim(AllValues[0].Gender),
                    thisEthnicity = myTrim(AllValues[0].Ethnicity),
                    thisRace = myTrim(AllValues[0].Race);

                document.getElementById('age').value = thisAge;

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
    //get all assessment for each Visit
    function getAllAssessment() {
        var AllAssessments = {};
        AllValues.forEach(function (item) {
            var VisitNo = AllAssessments[item.VisitNo] = AllAssessments[item.VisitNo] || {};
            VisitNo[item.Assessment] = true;
        });
        var outputList = [];
        for (var VisitNo in AllAssessments) {
            for (var Assessment in AllAssessments[VisitNo]) {
                outputList.push({ VisitNo: VisitNo, Assessment: Assessment });
            }
        }
        
        for (i = 0; i < outputList.length; i++) {
            WeekAssessments[i] = parseFloat(outputList[i].Assessment);
        }
        //var aaa = WeekAssessments;
    }

    function getAllAE() {        
        var AllAEs = AllValues.map(function (AllAE) {
            return {
                "VisitNo": AllAE.VisitNo,
                "AEDiscription": AllAE.AEDiscription,
                "Severity": AllAE.Severity                    
            }                   
        });        
        return AllAEs;   
    }

    function getAEs(VisitNo) {      
        var AEs = getAllAE();
        var i, j = 1;
        var AE, Severity;

        for (i = 0; i < AdventEvents.length; i++) {
            AdventEvents[i].value = "";
            Milds[i].checked = false;
            Moderates[i].checked = false;
            Severes[i].checked = false;
            document.getElementById('Yes').checked = false;
            document.getElementById('No').checked = false;
        }

        for (i = 0; i < AEs.length; i++) {
            if (AEs[i].VisitNo == VisitNo) {
                AE = AEs[i].AEDiscription;
                Severity = AEs[i].Severity;
                document.getElementById("AdventEvent" + j).value = AE;

                if (Severity == "Mild") {
                    document.getElementById('Mild' + j).checked = true;
                }
                else if (Severity == "Moderate") {
                    document.getElementById('Moderate' + j).checked = true;
                }
                else if (Severity == "Severe"){
                    document.getElementById('Severe' + j).checked = true;
                }

                if (Severity !== null) {
                    document.getElementById('Yes').checked = true;
                }
                else {
                    document.getElementById('No').checked = true;
                }
                j = j + 1;
            }            
        }
    }

})