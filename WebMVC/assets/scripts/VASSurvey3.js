

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
        //var messages = document.querySelectorAll('[id ^= "msg-Demog-"]');
        //for (i = 0; i < messages.length; i++) {
        //    messages[i].innerHTML = "";
        //}
        //var isAgeValid = true, isGenderValid = true, isRaceValid = true;
        //check_age = document.getElementById("Demog-age").value;
        //if (check_age == null || check_age === "") {
        //    document.getElementById("msg-Demog-age").innerHTML = "Please select one of these options";
        //    isAgeValid = false;
        //}

        //checked_gender = document.querySelector('input[name="Demog-gender"]:checked');
        //if (checked_gender == null) {
        //    document.getElementById("msg-Demog-gender").innerHTML = "Please select one of these options";
        //    isGenderValid = false;
        //}
        //checked_RaceEthni = document.querySelector('input[name="Demog-RaceEthni"]:checked');
        //if (checked_RaceEthni == null) {
        //    document.getElementById("msg-Demog-RaceEthni").innerHTML = "Please select one of these options";
        //    isRaceValid = false;
        //}

        //if (!isAgeValid || !isGenderValid || !isRaceValid) { return };

        //var inputs, fieldSets, inputarrs = [], FieldSetarrs = [];
        //inputs = document.querySelectorAll('[id ^= "Demog-"]');
        //fieldSets = document.querySelectorAll('[name ^= "Demog-"]');

        
        //for (i = 0; i < inputs.length; i++) {            
        //    var currentInputValue = inputs[i].value;
        //    if (currentInputValue == null || currentInputValue === "" || currentInputValue == "none" ) {
        //        inputarrs[i] = "";                
        //    }
        //    else inputarrs[i] = inputs[i].value;            
        //}
        //for (i = 0; i < fieldSets.length; i++) {
        //    var currentFieldSetsValue = fieldSets[i].value;
        //    if (currentFieldSetsValue == null || currentFieldSetsValue === "" || currentFieldSetsValue == "none") {
        //        FieldSetarrs[i] = "";
        //    }
        //    else FieldSetarrs[i] = fieldSets[i].value;
        //}


        //var a = inputarrs, b = FieldSetarrs;    

        //var result = confirm("There are still some options not selected. Are you sure to go to next page?");
        //if (result == false) {
        //    return;
        //}
        

        $("#section-proc").css("display", "inline-flex");
        $("#section-Demog").css("display", "none");
        $("#btnPrevious").css("display", "block");
        $("#btnNext").css("display", "none");
        $("#btnSubmit").css("display", "none");
        //if (VisitTime == 1) {
            $("#btnSubmit").css("display", "block");
        //}
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
            $("#btnAESubmit").css("display", "none");
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
                $("#btnAESubmit").css("display", "block");
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
        //if (VisitTime == 1) {
            $("#btnSubmit").css("display", "block");
        //} 
        $("#btnPrevious").css("display", "block");
        $("#btnNext").css("display", "none");
    })


    var buttonpressed;
    $('.btn').click(function () {
        buttonpressed = $(this).attr('id')
    })

    $('#Study3').on('submit', function (e) {
        e.preventDefault();

        if (buttonpressed === "btnSubmit") {
            Submit();
        }
        else if (buttonpressed === "btnAESubmit") {
            AESubmit();
        }
    })

    function Submit() {
        //var isValid = true;
        //if (check_age == null || checked_gender == null || checked_RaceEthni == null) {
        //    alert("Please fill in the Demographics page!");
        //    isValid = false;
        //}
        //if (!isValid) { return };
        Vailidator();
        //SelectValidator();
        //RadioValidator();
        if (result == false) {
            return;
        }

        var Age = $('#Demog-age').val(),
            gender = displayRadioValue('Demog-gender'),
            RaceEthni = displayRadioValue('Demog-RaceEthni'),
            ColonPolyp = displayRadioValue('Demog-ColonPolyp'),
            BiopsyDone = displayRadioValue('Demog-BiopsyDone'),
            Hemorrhoids = displayRadioValue('Demog-Hemorrhoids'),
            Diverticulitis = displayRadioValue('Demog-Diverticulitis'),
            Diabetes = displayRadioValue('Demog-Diabete'),
            Anemia = displayRadioValue('Demog-Anemia'),
            Hysterectomy = displayRadioValue('Demog-Hysterectomy'),
            ASA = displayRadioValue('Demog-ASA'),
            Kudo = displayRadioValue('Demog-Kudo'),
            Paris = displayRadioValue('Demog-Paris')
            ;
        var Randomization = displayRadioValue('proc-Randomization'),
            Successful = displayRadioValue('proc-DiviceSuccessful'),
            Comment = document.getElementById('proc-DescribeNotSuccess').value,
            Length = document.getElementById("proc-Length").value,
            Width = document.getElementById('proc-Width').value,
            DProc = document.getElementById('proc-DProc').value,
            Location = displayRadioValue('proc-LesionLocation'),
            Navigating = displayRadioValue('proc-Navigating'),
            CleanMargins = displayRadioValue('proc-CleanMargins'),
            TBegan = document.getElementById('proc-TBegan').value,
            TEnded = document.getElementById('proc-TEnded').value,
            TCeReached = document.getElementById('proc-TCeReached').value,
            TLeReached = document.getElementById('proc-TLeReached').value;

        var object, url;

            object = {
                VisitTime: VisitTime,
                UserID: UserID,
                SubjID: $('#SubjID').val(),
                Age: Age,
                Gender: gender,
                RaceEthni: RaceEthni,
                ColonPolyp: ColonPolyp,
                BiopsyDone: BiopsyDone,
                Hemorrhoids: Hemorrhoids,
                Diverticulitis: Diverticulitis,
                Diabetes: Diabetes,
                Anemia: Anemia,
                Hysterectomy: Hysterectomy,
                ASA: ASA,
                Kudo: Kudo,
                Paris: Paris,
                Randomization: Randomization,
                Successful: Successful,
                Comment: Comment,
                Length: Length,
                Width: Width,
                Location: Location,
                Navigating: Navigating,
                CleanMargins: CleanMargins,
                DProc: DProc,
                TBegan: TBegan,
                TEnded: TEnded,
                TCeReached: TCeReached,
                TLeReached: TLeReached
            };
            url = "/VASValue/InsertLumendi";

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
                }
                else {
                    alert("Oops! Something got wrong");
                }
            }
        })
    }

    function AESubmit() {
        var AEDiscription1 = document.getElementById('AdventEvent1').value,
            AEDiscription2 = document.getElementById('AdventEvent2').value,
            AEDiscription3 = document.getElementById('AdventEvent3').value,
            AEDiscription4 = document.getElementById('AdventEvent4').value;
        var severity1 = displayRadioValue('SEVERITY1'),
            severity2 = displayRadioValue('SEVERITY2'),
            severity3 = displayRadioValue('SEVERITY3'),
            severity4 = displayRadioValue('SEVERITY4');

        var object, url;
        
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
                    $("#btnAESubmit").css("display", "none");
                }
                else {
                    alert("Oops! Something got wrong");
                }
            }
        })
    }

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

                thisColonPolyp = myTrim(AllValues[0].ColonPolyp);
                thisBiopsyDone = myTrim(AllValues[0].BiopsyDone);
                thisHemorrhoids = myTrim(AllValues[0].Hemorrhoids);
                thisDiverticulitis = myTrim(AllValues[0].Diverticulitis);
                thisDiabetes = myTrim(AllValues[0].Diabetes);
                thisAnemia = myTrim(AllValues[0].Anemia);
                thisHysterectomy = myTrim(AllValues[0].Hysterectomy);
                thisASA = myTrim(AllValues[0].ASA);
                thisKudo = myTrim(AllValues[0].Kudo);
                thisParis = myTrim(AllValues[0].Paris);

                thisRandomization = myTrim(AllValues[0].Randomization);

                thisSuccessful = myTrim(AllValues[0].Successful);
                thisComment = myTrim(AllValues[0].Comment);

                thisLength = AllValues[0].Length;
                thisWidth = AllValues[0].Width;

                thisLocation = myTrim(AllValues[0].Location);
                thisNavigating = myTrim(AllValues[0].Navigating);
                thisCleanMargins = myTrim(AllValues[0].CleanMargins);

                thisDProc = AllValues[0].DProc;
                thisTBegan = AllValues[0].TBegan;
                thisTEnded = AllValues[0].TEnded;
                thisTCeReached = AllValues[0].TCeReached;
                thisTLeReached = AllValues[0].TLeReached;

                document.getElementById('Demog-age').value = thisAge;

                if (thisGender == "Male") {
                    document.getElementById('male').checked = true;
                }
                else if (thisGender == "Female") {
                    document.getElementById('female').checked = true;
                }
                
                switch (thisRaceEthni) {
                    case "African American/Black/Not of Hispanic Origin":
                        document.getElementById('Black').checked = true;
                        break;
                    case "American Indian or Alaska Native":
                        document.getElementById('AmericanIndian').checked = true;
                        break;
                    case "Asian":
                        document.getElementById('Asian').checked = true;
                        break;
                    case "Caucasian/White/Not of Hispanic Origin":
                        document.getElementById('White').checked = true;
                        break;
                    case "Hispanic or Latino":
                        document.getElementById('Hispanic').checked = true;
                        break;
                    case "Native Hawaiian or Other Pacific Islander":
                        document.getElementById('Hawaiian').checked = true;
                        break;
                    case "Other":
                        document.getElementById('Other').checked = true;
                        break;
                }


                Radiochecked(thisColonPolyp, 'ColonPolyp');
                Radiochecked(thisBiopsyDone, 'BiopsyDone');
                Radiochecked(thisHemorrhoids, 'Hemorrhoids');
                Radiochecked(thisDiverticulitis, 'Diverticulitis');
                Radiochecked(thisDiabetes, 'Diabetes');
                Radiochecked(thisAnemia, 'Anemia');
                Radiochecked(thisHysterectomy, 'Hysterectomy');


                switch (thisASA ) {
                    case "1":
                        document.getElementById('ASA1').checked = true;
                        break;
                    case "2":
                        document.getElementById('ASA2').checked = true;
                        break;
                    case "3":
                        document.getElementById('ASA3').checked = true;
                        break;
                }


                switch (thisKudo) {
                    case "II":
                        document.getElementById('Kudo1').checked = true;
                        break;
                    case "IIA":
                        document.getElementById('Kudo2').checked = true;
                        break;
                    case "IIIL":
                        document.getElementById('Kudo3').checked = true;
                        break;
                    case "IIIS":
                        document.getElementById('Kudo4').checked = true;
                        break;
                    case "IV":
                        document.getElementById('Kudo5').checked = true;
                        break;
                }

                switch (thisParis) {
                    case "IIa":
                        document.getElementById('Paris1').checked = true;
                        break;
                    case "IIb":
                        document.getElementById('Paris2').checked = true;
                        break;
                    case "IIa+IIb":
                        document.getElementById('Paris3').checked = true;
                        break;
                    case "Ip":
                        document.getElementById('Paris4').checked = true;
                        break;
                    case "Is":
                        document.getElementById('Paris5').checked = true;
                        break;
                    case "Is+IIa":
                        document.getElementById('Paris6').checked = true;
                        break;
                    case "Is+Ip":
                        document.getElementById('Paris7').checked = true;
                        break;
                }

                if (thisRandomization == "Control") {
                    document.getElementById('Control').checked = true;
                }
                else if (thisRandomization == "Device") {
                    document.getElementById('Device').checked = true;
                }

                Radiochecked(thisSuccessful, 'DiviceSuccessful');

                switch (thisLocation ) {
                    case "Appendix":
                        document.getElementById('LesionLocation1').checked = true;
                        break;
                    case "Ascending Colon":
                        document.getElementById('LesionLocation2').checked = true;
                        break;
                    case "Cecum":
                        document.getElementById('LesionLocation3').checked = true;
                        break;
                    case "Descending Colon":
                        document.getElementById('LesionLocation4').checked = true;
                        break;
                    case "Hepatic Flexure":
                        document.getElementById('LesionLocation5').checked = true;
                        break;
                    case "ICV":
                        document.getElementById('LesionLocation6').checked = true;
                        break;
                    case "Rectum":
                        document.getElementById('LesionLocation7').checked = true;
                        break;
                    case "Sigmoid":
                        document.getElementById('LesionLocation8').checked = true;
                        break;
                    case "Splenic Flexure":
                        document.getElementById('LesionLocation9').checked = true;
                        break;
                    case "Transverse Colon":
                        document.getElementById('LesionLocation10').checked = true;
                        break;
                }
                switch (thisNavigating ) {
                    case "Difficult":
                        document.getElementById('Navigating1').checked = true;
                        break;
                    case "Somewhat Difficult":
                        document.getElementById('Navigating2').checked = true;
                        break;
                    case "Somewhat Easy":
                        document.getElementById('Navigating3').checked = true;
                        break;
                    case "Easy":
                        document.getElementById('Navigating4').checked = true;
                        break;                    
                }

                if (thisCleanMargins  == "Yes") {
                    document.getElementById('CleanMarginsYes').checked = true;
                }
                else if (thisCleanMargins == "No") {
                    document.getElementById('CleanMarginsNo').checked = true;
                }

                if (thisComment == null || thisComment == "undefined") {
                    document.getElementById('proc-DescribeNotSuccess').value = "";
                }
                else {
                    document.getElementById('proc-DescribeNotSuccess').value = thisComment;
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
        //document.getElementById("section-Demog").classList.add("isDisabled")
        //document.getElementById("section-proc").classList.add("isDisabled")
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
        if (x !== null) {
            return x.replace(/^\s+|\s+$/gm, '')/*.toLowerCase()*/;
        }
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

    //Yes or No checked function
    function Radiochecked(x, element) {
        if (x == "Yes") {
            document.getElementById(element + 'Yes').checked = true;
        }
        else if (x == "No") {
            document.getElementById(element + 'No').checked = true;
        }
    }

    var result;
    function RadioValidator() {
        var ShowAlert = '';
        //var AllFormElements = document.getElementById("Study3").elements;
        var AllFormElements = document.querySelectorAll('[name ^= "Demog-"], [name ^= "proc-"]');
        for (i = 0; i < AllFormElements.length; i++) {
            if (AllFormElements[i].type == 'radio') {
                var ThisRadio = AllFormElements[i].name;
                var labelContent = $("label[for='" + ThisRadio + "']").text();
                var ThisChecked = 'No';
                var AllRadioOptions = document.getElementsByName(ThisRadio);
                for (x = 0; x < AllRadioOptions.length; x++) {
                    if (AllRadioOptions[x].checked && ThisChecked == 'No') {
                        ThisChecked = 'Yes';
                        break;
                    }
                }
                var AlreadySearched = ShowAlert.indexOf(ThisRadio);
                if (ThisChecked == 'No' && AlreadySearched == -1) {
                    ShowAlert = ShowAlert + labelContent + ' are not been selected\n';
                }
            }
        }
        if (ShowAlert != '') {
            result = confirm('There are still some options not selected. Are you sure you want to submit your subject?');
        }        
    }

    function SelectValidator() {
        var ShowAlert = '';
        var AllSelectElements = document.getElementsByTagName('select');
        for (i = 0; i < AllSelectElements.length; i++) {
            if (AllSelectElements[i].nodeValue == null ) {
                var ThisSelect = AllSelectElements[i].id;
                var labelContent = $("label[for='" + ThisSelect + "']").text();
                ShowAlert = ShowAlert + labelContent + ' are not been selected\n';
            }
        }
    }

    function Vailidator() {
        var ShowAlert = '';
        var AllFormElements = document.querySelectorAll('[id ^= "Demog-"], [id ^= "proc-"], [name ^= "Demog-"], [name ^= "proc-"]');
        for (i = 0; i < AllFormElements.length; i++) {
            if (AllFormElements[i].type == 'radio') {
                var ThisRadio = AllFormElements[i].name;
                var labelContent = $("label[for='" + ThisRadio + "']").text();
                var ThisChecked = 'No';
                var AllRadioOptions = document.getElementsByName(ThisRadio);
                for (x = 0; x < AllRadioOptions.length; x++) {
                    if (AllRadioOptions[x].checked && ThisChecked == 'No') {
                        ThisChecked = 'Yes';
                        break;
                    }
                }
                var AlreadySearched = ShowAlert.indexOf(ThisRadio);
                if (ThisChecked == 'No' && AlreadySearched == -1 && ThisRadio != CurrentRaido) {
                    ShowAlert = ShowAlert + labelContent + ' are not been selected\n';
                }
                var CurrentRaido = ThisRadio;
            }
            else if (AllFormElements[i].type == 'number' || AllFormElements[i].type == 'date' || AllFormElements[i].type == 'time' || AllFormElements[i].localName == "textarea") {
                if (AllFormElements[i].nodeValue == null) {
                    var ThisSelect = AllFormElements[i].id;
                    var labelContent = $("label[for='" + ThisSelect + "']").text();
                    ShowAlert = ShowAlert + labelContent + ' are not been selected\n';
                }
            }
            else if (AllFormElements[i].localName == "select") {
                var ThisSelect = AllFormElements[i].id;
                var a = document.getElementById(ThisSelect).value;
                if (document.getElementById(ThisSelect).value == null || document.getElementById(ThisSelect).value == "none" || document.getElementById(ThisSelect).value == "") {
                    var labelContent = $("label[for='" + ThisSelect + "']").text();
                    ShowAlert = ShowAlert + labelContent + ' are not been selected\n';
                }
            }
        }
        if (ShowAlert != '') {
            //result = confirm('There are still some options not selected. Are you sure you want to submit your subject?');
            result = confirm(ShowAlert);
        }        
    }
})


//There are still some options not selected.Are you sure to go to next page


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