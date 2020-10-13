const UserID = getParameterByName('UserID'),
      SurveyID = getParameterByName('SurveyID'),
      StudyName = getParameterByName('StudyName');

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//var arr = document.referrer.split("/");
//var url = arr.slice(-1)[0];
//if (url !== "VerifyEmail?SurveyID=3" && url !== "Signup?SurveyID=3" && url !== "LumendiSummary?UserID="+UserID ) {
//    window.location.replace("/VAS/VerifyEmail?SurveyID=3");
//}

$(document).ready(function () {
    document.getElementById("UserID").innerHTML = UserID;

    $('button').click(function () {
        $(this).toggleClass('down');
    });

    /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;
    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }

    //const UserID = getParameterByName('UserID');

    var $curr, $first, $last = $("#section-AE"), VisitTime, obj,
        AllValues, thisAge, thisGender, thisRaceEthni, thisRandomization, thisLength, thisWidth, thisTBegan, thisTEnded, thisTCeReached, thisTLeReached;

    //const Previous = document.getElementById("btnPrevious");
    //const Next = document.getElementById("btnNext");
    const SubjID = document.getElementById("SubjID"),
          SignOut = document.getElementById("btnSignOut");
    
    var Visits = document.querySelectorAll('[id ^= "Visit"]'),
        VisitsArray = Array.prototype.slice.call(Visits),
        Summary = document.getElementById("Summary");
    var AEVisits = document.querySelectorAll('[id ^= "AEVisit"]'),   
        AEVisitsArray = Array.prototype.slice.call(AEVisits);

    var DemogVisit0 = document.getElementById('DemogVisit0'),
        ProcVisit0 = document.getElementById('ProcVisit0');
        
    
    var AdventEvents = document.querySelectorAll('[id ^= "AdventEvent"]'),
        Milds = document.querySelectorAll('[id ^= "Mild"]'),
        Moderates = document.querySelectorAll('[id ^= "Moderate"]'),
        Severes = document.querySelectorAll('[id ^= "Severe"]');

    Summary.addEventListener('click', function (e) {
        e.preventDefault;
        window.location.replace("/VAS/LumendiSummary" + "?UserID=" + UserID)
    })

    SubjID.addEventListener('input', function () { 
        var messages = document.querySelectorAll('[id ^= "msg-"]');
        for (i = 0; i < messages.length; i++) {
            messages[i].innerHTML = "";
        }
        for (var i = 0; i < Visits.length; i++) {
            Visits[i].classList.remove("isDisabled");
        }
        for (var i = 0; i < AEVisits.length; i++) {
            AEVisits[i].classList.remove("isDisabled");
        }
        $("#section-Demog").css("display", "inline-flex");
        $("#section-proc").css("display", "none");
        $("#section-AE").css("display", "none");
        $("#btnSubmit").css("display", "none");
        $("#btnPrevious").css("display", "none");
        $("#btnNext").css("display", "block");

        if (SubjID.value.length >= 6) {
            
            //$curr = $("#section-Demog");
            //$first = $("#section-Demog");
            empty();
            obj = { UserID: UserID, SubjID: SubjID.value };   
            for (var i = 1; i < Visits.length; i++) {
                Visits[i].classList.remove("isDisabled");
            }
            //Check how many visits this is
            $.ajax({
                type: "POST",
                url: "/VASValue/CheckLumendiSubjExists",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    //VisitTime = parseInt(data.returnvalue);
                    
                    switch (data.returnvalue) {
                        case "-1":
                            for (var i = 0; i < Visits.length; i++) {
                                Visits[i].classList.add("isDisabled");
                            }
                            for (var i = 0; i < AEVisits.length; i++) {
                                AEVisits[i].className = "isDisabled";
                            }
                            document.getElementById("section-Demog").classList.add("isDisabled");
                            document.getElementById("section-proc").classList.add("isDisabled");
                            document.getElementById("section-AE").classList.add("isDisabled");
                            $("#btnNext").css("display", "none");
                            alert("This Subject belong to other User!");
                            break;
                        case "0":
                            VisitTime = 1;
                            $last = $("#section-proc");
                            for (var i = 1; i < Visits.length; i++) {
                                Visits[i].classList.add("isDisabled");
                            }
                            for (var i = 0; i < AEVisits.length; i++) {
                                AEVisits[i].className = "isDisabled";
                            }
                            document.getElementById("section-Demog").classList.remove("isDisabled");
                            document.getElementById("section-proc").classList.remove("isDisabled");
                            document.getElementById("section-AE").classList.remove("isDisabled");
                            break;
                        case "1":                            
                            VisitTime = 2;
                            for (var i = 2; i < Visits.length; i++) {
                                Visits[i].classList.add("isDisabled");
                            }
                            for (var i = 1; i < AEVisits.length; i++) {
                                AEVisits[i].className = "isDisabled";
                            }
                            NotFirstVisit();
                            break;
                        case "2":
                            VisitTime = 3;
                            for (var i = 3; i < Visits.length; i++) {
                                Visits[i].classList.add("isDisabled");
                            }
                            for (var i = 2; i < AEVisits.length; i++) {
                                AEVisits[i].className = "isDisabled";
                            }
                            NotFirstVisit();
                            break;
                        case "3":
                            VisitTime = 4;
                            for (var i = 4; i < Visits.length; i++) {
                                Visits[i].classList.add("isDisabled");
                            }
                            for (var i = 3; i < AEVisits.length; i++) {
                                AEVisits[i].className = "isDisabled";
                            }
                            NotFirstVisit();
                            break;
                        case "4":
                            VisitTime = 5;
                            NotFirstVisit();
                            break;
                        case "5":
                            VisitTime = 6;
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


    //Previous.addEventListener('click', function (e) {
    //    e.preventDefault();
    //    $curr.css("display", "none");
    //    $curr = $curr.prev();
    //    $("section").css("display", "none");
    //    $("#btnSubmit").css("display", "none");
    //    $("#btnNext").css("display", "block");
    //    if ($curr.is($first)) {
    //        $("#btnPrevious").css("display", "none");
    //    }
    //    $curr.css("display", "inline-flex");
    //})
    //Next.addEventListener('click', function (e) {
    //    e.preventDefault();
    //    $("#btnPrevious").css("display", "block");
    //    $curr.css("display", "none");
    //    $curr = $curr.next();
    //    $("section").css("display", "none");
    //    if ($curr.is($last)) {
    //        $("#btnSubmit").css("display", "block");
    //        $("#btnNext").css("display", "none");
    //    }
    //    $curr.css("display", "inline-flex");
    //    if (temp+1 < VisitTime) {
    //        $("#btnSubmit").css("display", "none");
    //        if (temp == 0) {
    //            $("#section-AE").css("display", "none");
    //        }
    //    }  
    //})

    $("#btnPrevious").on('click', function (e) {
        e.preventDefault();
        $("#section-proc").css("display", "none");
        $("#section-Demog").css("display", "inline-flex");
        $("#btnPrevious").css("display", "none");
        $("#btnNext").css("display", "block");
        $("#btnSubmit").css("display", "none");
    })

    var check_age, checked_gender, checked_RaceEthni;
    $("#btnNext").on('click', function (e) {
        e.preventDefault();
        var messages = document.querySelectorAll('[id ^= "msg-Demog-"]');
        for (i = 0; i < messages.length; i++) {
            messages[i].innerHTML = "";
        }
        var isAgeValid = true, isGenderValid = true, isRaceValid = true;
        check_age = document.getElementById("Demog-age").value;
        if (check_age == null || check_age === "") {
            document.getElementById("msg-Demog-age").innerHTML = "Please select one of these options";
            isAgeValid = false;
        }

        checked_gender = document.querySelector('input[name="Demog-gender"]:checked');
        if (checked_gender == null) {
            document.getElementById("msg-Demog-gender").innerHTML = "Please select one of these options";
            isGenderValid = false;
        }
        checked_RaceEthni = document.querySelector('input[name="Demog-RaceEthni"]:checked');
        if (checked_RaceEthni == null) {
            document.getElementById("msg-Demog-RaceEthni").innerHTML = "Please select one of these options";
            isRaceValid = false;
        }

        if (!isAgeValid || !isGenderValid || !isRaceValid) { return };

        $("#section-proc").css("display", "inline-flex");
        $("#section-Demog").css("display", "none");
        $("#btnPrevious").css("display", "block");
        $("#btnNext").css("display", "none");
        $("#btnSubmit").css("display", "none");
        if (VisitTime == 1) {
            $("#btnSubmit").css("display", "block");
        }
    })

    //var temp;
    VisitsArray.forEach(function (Visit, index) {
        Visit.addEventListener('click', function (e) {
            e.preventDefault();
            //getAEs(index);
            //$("#section-proc").removeClass("isDisabled")
            //$("#section-AE").removeClass("isDisabled")
            //$("#section-Demog").css("display", "inline-flex");
            //$("#section-proc").css("display", "none");
            //$("#section-AE").css("display", "none");
            //$("#btnPrevious").css("display", "none");
            //$("#btnNext").css("display", "block");
            //$("#btnSubmit").css("display", "none");
            //$curr = $("#section-Demog");
            //if (index + 1 <= VisitTime) {
            //    $("#section-proc").addClass("isDisabled");
            //}
            //if (index + 1 < VisitTime) {
            //    $("#section-AE").addClass("isDisabled");
            //}
            //temp = index;
        })
    })

    AEVisitsArray.forEach(function (AEVisit, index) {
        AEVisit.addEventListener('click', function (e) {
            e.preventDefault();
            $("#btnPrevious").css("display", "none");
            $("#btnNext").css("display", "none");
            $("#btnSubmit").css("display", "none");
            document.getElementById("section-AE").classList.remove("isDisabled");
            $("#btnSubmit").css("display", "none");
            getAEs(index + 2);
            $("#section-Demog").css("display", "none");
            $("#section-proc").css("display", "none");
            $("#section-AE").css("display", "inline-flex");
            if (index + 2 < VisitTime) {
                document.getElementById("section-AE").classList.add("isDisabled");
            } 
            if (index + 2 == VisitTime) {
                $("#btnSubmit").css("display", "block");
            }
        })
    })

    DemogVisit0.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Demog").css("display", "inline-flex");
        $("#section-proc").css("display", "none");
        $("#section-AE").css("display", "none");
        $("#btnSubmit").css("display", "none");        
        $("#btnPrevious").css("display", "none");
        $("#btnNext").css("display", "block");
    })

    ProcVisit0.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Demog").css("display", "none");
        $("#section-proc").css("display", "inline-flex");
        $("#section-AE").css("display", "none");
        if (VisitTime == 1) {
            $("#btnSubmit").css("display", "block");
        } 
        $("#btnPrevious").css("display", "block");
        $("#btnNext").css("display", "none");
    })

    $('#Study3').on('submit', function (e) {
        e.preventDefault();
        var isValid = true;
        if (check_age == null || checked_gender == null || checked_RaceEthni == null) {
            alert("Please fill in the Demographics page!");
            isValid = false;
        }
        if (!isValid) { return };

        var gender = displayRadioValue('Demog-gender'),
            RaceEthni = displayRadioValue('Demog-RaceEthni');
        var Randomization = displayRadioValue('proc-Randomization'),
            Length = document.getElementById("proc-Length").value,
            Width = document.getElementById('proc-Width').value,
            DProc = document.getElementById('proc-DProc').value,
            TBegan = document.getElementById('proc-TBegan').value,
            TEnded = document.getElementById('proc-TEnded').value,
            TCeReached = document.getElementById('proc-TCeReached').value,
            TLeReached = document.getElementById('proc-TLeReached').value;
        var AEDiscription1 = document.getElementById('AdventEvent1').value,
            AEDiscription2 = document.getElementById('AdventEvent2').value,
            AEDiscription3 = document.getElementById('AdventEvent3').value,
            AEDiscription4 = document.getElementById('AdventEvent4').value;
        var severity1 = displayRadioValue('SEVERITY1'),
            severity2 = displayRadioValue('SEVERITY2'),
            severity3 = displayRadioValue('SEVERITY3'),
            severity4 = displayRadioValue('SEVERITY4');

        var object, url;

        if (VisitTime == 1) {
            object = {
                UserID: UserID,
                SubjID: $('#SubjID').val(),
                Age: $('#Demog-age').val(),
                Gender: gender,
                RaceEthni: RaceEthni,
                Randomization: Randomization,
                Length: Length,
                Width: Width,
                DProc: DProc,
                TBegan: TBegan,
                TEnded: TEnded,
                TCeReached: TCeReached,
                TLeReached: TLeReached
            };
            url = "/VASValue/InsertLumendi";
        }
        else {
            object = {
                SubjID: $('#SubjID').val(),
                VisitNo: VisitTime,
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
                    alert("Success!");
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

    //button Sign Out: change to VerifyEmail
    SignOut.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.replace("/VAS/Signin" + "?SurveyID=" + SurveyID+ "&StudyName=" + StudyName)
    })

    //fill age dropdown menu
    for (var i = 18; i <= 100; i++) {
        var select = document.getElementById("Demog-age");
        var option = document.createElement("OPTION");
        select.options.add(option);
        option.text = i;
        option.value = i;

    }

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
                thisDProc = AllValues[0].DProc;
                thisTBegan = AllValues[0].TBegan;
                thisTEnded = AllValues[0].TEnded;
                thisTCeReached = AllValues[0].TCeReached;
                thisTLeReached = AllValues[0].TLeReached;

                document.getElementById('Demog-age').value = thisAge;

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
                document.getElementById('proc-Length').value = thisLength;
                document.getElementById('proc-Width').value = thisWidth;
                document.getElementById('proc-DProc').value = thisDProc;
                document.getElementById('proc-TBegan').value = thisTBegan;
                document.getElementById('proc-TEnded').value = thisTEnded;
                document.getElementById('proc-TCeReached').value = thisTCeReached;
                document.getElementById('proc-TLeReached').value = thisTLeReached;
            }
        });
        document.getElementById("section-Demog").classList.add("isDisabled")
        document.getElementById("section-proc").classList.add("isDisabled")
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

    //get all Adverse Events for each Visit
    function getAEs(VisitNo) {
        var AEs = AllValues.map(function (AllAE) {
            return {
                "VisitNo": AllAE.VisitNo,
                "AEDiscription": AllAE.AEDiscription,
                "Severity": AllAE.Severity
            }
        });
        var j = 1;
        var AE, Severity;

        for (var i = 0; i < AdventEvents.length; i++) {
            AdventEvents[i].value = "";
            Milds[i].checked = false;
            Moderates[i].checked = false;
            Severes[i].checked = false;
            document.getElementById('Yes').checked = false;
            document.getElementById('No').checked = false;
        }

        for (var i = 0; i < AEs.length; i++) {
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

    //empty the proc except Subject ID
    function empty() {
        $('input[type=radio]').each(function () { $(this).prop('checked', false); });

        document.getElementById('Demog-age').value = "";

        document.getElementById('proc-Length').value = "";
        document.getElementById('proc-Width').value = "";
        document.getElementById('proc-TBegan').value = "";
        document.getElementById('proc-TEnded').value = "";
        document.getElementById('proc-TCeReached').value = "";
        document.getElementById('proc-TLeReached').value = "";

        for (var i = 0; i < AdventEvents.length; i++) {
            AdventEvents[i].value = "";
        }        
    }


})
