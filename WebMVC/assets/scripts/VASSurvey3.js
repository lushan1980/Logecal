
//var arr = document.referrer.split("/");
//var url = arr.slice(-1)[0];
//if (url !== "VerifyEmail?SurveyID=3" && url !== "Signup?SurveyID=3") {
//    window.location.replace("/VAS/VerifyEmail?SurveyID=3");
//}


$(document).ready(function () {

    const UserID = getParameterByName('UserID');

    var $curr = $("#section-Demog");
    var $first = $("#section-Demog");
    var $divButton = $("#divButton");
    var $last = $("#section-AE");
    const Previous = document.getElementById("btnPrevious");
    const Next = document.getElementById("btnNext");
    const SubjID = document.getElementById("SubjID");

    var VisitTime;
    var obj;

    var AllValues, thisAge, thisGender, thisRaceEthni, thisRandomization, thisLength, thisWidth, thisTBegan, thisTEnded, thisTCeReached, thisTLeReached;
    
    var Visits = document.querySelectorAll('[id ^= "Visit"]');
    var AdventEvents = document.querySelectorAll('[id ^= "AdventEvent"]'),
        Milds = document.querySelectorAll('[id ^= "Mild"]'),
        Moderates = document.querySelectorAll('[id ^= "Moderate"]'),
        Severes = document.querySelectorAll('[id ^= "Severe"]');

    SubjID.addEventListener('input', function () {
        obj = { SubjID: SubjID.value };
        if (SubjID.value.length >= 6) {
            //Check how many visits this is
            $.ajax({
                type: "POST",
                url: "/VASValue/CheckLumendiSubjExists",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    //VisitTime = parseInt(data.returnvalue);
                    var i;
                    switch (data.returnvalue) {
                        case "0":
                            VisitTime = 1;
                            $last = $("#section-proc");
                            for (i = 1; i < Visits.length; i++) {
                                Visits[i].className = "isDisabled";
                            }
                            break;
                        case "1":                            
                            VisitTime = 2;
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
                },
                error: function () {
                    alert("Something got wrong!")
                }

            })
        }
    })


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

            getAEs(index + 1);
            $("#section-proc").removeClass("isDisabled")
            $("#section-AE").removeClass("isDisabled")
            $("#section-Demog").css("display", "inline-flex");
            $("#section-proc").css("display", "none");
            $("#section-AE").css("display", "none");
            $("#btnPrevious").css("display", "none");
            $("#btnNext").css("display", "block");
            $("#btnSubmit").css("display", "none");
            $curr = $("#section-Demog");
            if (index < VisitTime) {
                $("#section-proc").addClass("isDisabled")
                $("#section-AE").addClass("isDisabled")
            }
            temp = index;
        })

    })

    $('#Study3').on('submit', function (event) {
        event.preventDefault();
        var gender = displayRadioValue('gender'),
            RaceEthni = displayRadioValue('RaceEthni');
        var Randomization = displayRadioValue('Randomization'),
            Length = document.getElementById("Length").value,
            Width = document.getElementById("Width").value,
            TBegan = document.getElementById("TBegan").value,
            TEnded = document.getElementById("TEnded").value,
            TCeReached = document.getElementById("TCeReached").value,
            TLeReached = document.getElementById("TLeReached").value;
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
                UserID: UserID,
                SubjID: $('#SubjID').val(),
                Age: $('#age').val(),
                Gender: gender,
                RaceEthni: RaceEthni,
                Randomization: Randomization,
                Length: Length,
                Width: Width,
                TBegan: TBegan,
                TEnded: TEnded,
                TCeReached: TCeReached,
                TLeReached: TLeReached
            };
            url = "/VASValue/InsertLumendi";
        }
        else {
            object = {
                SubjID: SubjID,
                AEDiscription1: AEDiscription1,
                Severity1: severity1,
                AEDiscription2: AEDiscription2,
                Severity2: severity2,
                AEDiscription3: AEDiscription3,
                Severity3: severity3,
                AEDiscription4: AEDiscription4,
                Severity4: severity4
            };
            url = "/VASValue/InsertLumendiAE";
        }

        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: JSON.stringify(object),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.returnvalue) {
                    alert("Subject already input in Database!");
                    $('#Study3')[0].reset();
                    $("#section-Demog").css("display", "inline-flex");
                    $("#section-proc").css("display", "none");
                    $("#section-AE").css("display", "none");
                    $("#btnPrevious").css("display", "none");
                    $("#btnNext").css("display", "block");
                    $("#btnSubmit").css("display", "none");
                    //$divButton.remove();
                    //$("#section-Demog").remove();
                    //$("#section-feeling").remove();
                    //$("#section-AE").remove();
                    //divSuccessMessage = '<p>Thank you for take part in our study</p>';
                    //$("#SuccessMessage").append(divSuccessMessage);
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
            url: "/VASValue/GetLumendiAllValue",
            dataType: "json",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                AllValues = JSON.parse(data);
                
                thisAge = AllValues[0].Age;
                thisGender = myTrim(AllValues[0].Gender);
                thisRaceEthni = myTrim(AllValues[0].RaceEthni);
                thisRandomization = myTrim(AllValues[0].Randomization);
                thisLength = AllValues[0].Length;
                thisWidth = AllValues[0].Width;
                thisTBegan = AllValues[0].TBegan;
                thisTEnded = AllValues[0].TEnded;
                thisTCeReached = AllValues[0].TCeReached;
                thisTLeReached = AllValues[0].TLeReached;

                document.getElementById('age').value = thisAge;

                if (thisGender == "male") {
                    document.getElementById('male').checked = true;
                }
                else {
                    document.getElementById('female').checked = true;
                }

                switch (thisRaceEthni) {
                    case "african american/black/not of hispanic origin":
                        document.getElementById('Black').checked = true;
                        break;
                    case "american indian or alaska native":
                        document.getElementById('AmericanIndian').checked = true;
                        break;
                    case "asian":
                        document.getElementById('Asian').checked = true;
                        break;
                    case "caucasian/white/not of hispanic origin":
                        document.getElementById('White').checked = true;
                        break;
                    case "hispanic or latino":
                        document.getElementById('Hispanic').checked = true;
                        break;
                    case "native hawaiian or other pacific islander":
                        document.getElementById('Hawaiian').checked = true;
                        break;
                    case "other":
                        document.getElementById('Other').checked = true;
                        break;
                }

                if (thisRandomization == "Control") {
                    document.getElementById('Control').checked = true;
                }
                else {
                    document.getElementById('Device').checked = true;
                }
                document.getElementById('Length').value = thisLength;
                document.getElementById('Width').value = thisWidth;
                document.getElementById('TBegan').value = thisTBegan;
                document.getElementById('TEnded').value = thisTEnded;
                document.getElementById('TCeReached').value = thisTCeReached;
                document.getElementById('TLeReached').value = thisTLeReached;
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
        var val = "";
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
                else if (Severity == "Severe") {
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
