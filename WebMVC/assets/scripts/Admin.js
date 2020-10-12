
$(document).ready(function () {

    const SurveyID = getParameterByName('SurveyID');

    var Invitation = document.getElementById('Invitation'),
        Demog = document.getElementById('Summary0'),
        Proc = document.getElementById('Summary1'),
        AE = document.getElementById('Summary2');

    //Invitation click event
    Invitation.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Invitation").css("display", "inline-flex");
        $("#section-Demog").css("display", "none");
        $("#section-AE").css("display", "none");
        $("#section-Proc").css("display", "none");
    })

    $('#InvitationForm').on('submit', function (e) {
        e.preventDefault();

        var object = {
            SurveyID: SurveyID,
            Email: $('#User-Email').val(),
            Administrator: "User"
        };
        url = "/VASValue/InviteUser";

        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: JSON.stringify(object),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.returnvalue) {
                    alert("Success!");
                }
                else {
                    alert("Oops! Something got wrong");
                }
            }
        })
    })

    //get Demographics all values table
    Demog.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Invitation").css("display", "none");
        $("#section-Demog").css("display", "inline-flex");
        $("#section-AE").css("display", "none");
        $("#section-Proc").css("display", "none");

        //get Demographics all values table
        $.ajax({
            type: 'POST',
            url: "/VASValue/GetLumendiAllDemog",

            contentType: "application/json; charset=utf-8",
            success: function (data) {

                AllValues = JSON.parse(data);

                $.each(AllValues, function (index, value) {
                    var row = $("<tr id='Demogtr" + index + "'><td  id='DemogtdUserID" + index + "' style='text-align: center'>" + value.UserID +
                        "</td><td id='DemogtdSubjID" + index + "' style='text-align: center'>" + value.SubjID +
                        "</td><td id='DemogtdAge" + index + "' style='text-align: center'>" + value.Age +
                        "</td><td id='DemogtdGender" + index + "'>" + value.Gender +
                        "</td><td id='DemogtdRaceEthni" + index + "'>" + value.RaceEthni +
                        "</td><td id='DemogtdOptions" + index + "' style='text-align: center'>" +
                        "<button id='Demogedit" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-pencil'></i>" + "</button>" +
                        "<button id='Demogsave" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-floppy-o'></i>" + "</button>" +
                        "<button id='Demogdelete" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-trash'></i>" + "</button>" +
                        "</td><tr>");
                    $("#table-Demog").append(row);
                });

            },
            error: function () {
                alert("Something got wrong");
            }
        }).done(function () {
            //edit[i] code
            var Edits = document.querySelectorAll('[id ^= "Demogedit"]'),
                EditsArray = Array.prototype.slice.call(Edits);
            var trs = document.querySelectorAll('[id ^= "Demogtr"]'),
                tdUserIDs = document.querySelectorAll('[id ^= "DemogtdUserID"]'),
                tdSubjIDs = document.querySelectorAll('[id ^= "DemogtdSubjID"]'),
                tdAges = document.querySelectorAll('[id ^= "DemogtdAge"]'),
                tdGenders = document.querySelectorAll('[id ^= "DemogtdGender"]'),
                tdRaceEthnis = document.querySelectorAll('[id ^= "DemogtdRaceEthni"]');

            EditsArray.forEach(function (Edit, index) {
                Edit.addEventListener('click', function (e) {
                    e.preventDefault();
                    tdAges[index].contentEditable = true;
                    tdGenders[index].contentEditable = true;
                    tdRaceEthnis[index].contentEditable = true;
                })
            })

            //delete[i] code
            var Deletes = document.querySelectorAll('[id ^= "Demogdelete"]'),
                DeletesArray = Array.prototype.slice.call(Deletes);

            DeletesArray.forEach(function (Save, index) {
                Save.addEventListener('click', function (e) {
                    e.preventDefault();
                    obj = {
                        UserID: tdUserIDs[index].innerHTML,
                        SubjID: tdSubjIDs[index].innerHTML
                    };
                    $.ajax({
                        type: "POST",
                        url: "/VASValue/DeleteDemog",
                        dataType: "json",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data.returnvalue == "1") {
                                trs[index].remove();
                            }
                            else if (data.returnvalue == "0") {
                                alert("You cannot delete this Subject, since you have that in Procedure table!")
                            }
                        },
                        error: function () {
                            alert("Something got wrong!")
                        }
                    })
                })
            })
            //save[i] code
            var Saves = document.querySelectorAll('[id ^= "Demogsave"]'),
                SavesArray = Array.prototype.slice.call(Saves);

            SavesArray.forEach(function (Save, index) {
                Save.addEventListener('click', function (e) {
                    e.preventDefault();
                    obj = {
                        UserID: tdUserIDs[index].innerHTML,
                        SubjID: tdSubjIDs[index].innerHTML,
                        Age: tdAges[index].innerHTML,
                        Gender: tdGenders[index].innerHTML,
                        RaceEthni: tdRaceEthnis[index].innerHTML
                    };
                    $.ajax({
                        type: "POST",
                        url: "/VASValue/EditDemog",
                        dataType: "json",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data.returnvalue) {
                                alert("Success!")
                            }
                        },
                        error: function () {
                            alert("Something got wrong!")
                        }
                    })
                })
            })
        })
    })

    //Procedure Link event
    Proc.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Invitation").css("display", "none");
        $("#section-Demog").css("display", "none");
        $("#section-AE").css("display", "none");
        $("#section-Proc").css("display", "inline-flex");
        //get Procedure all values table
        $.ajax({
            type: 'POST',
            url: "/VASValue/GetLumendiAllProc",

            contentType: "application/json; charset=utf-8",
            success: function (data) {

                AllValues = JSON.parse(data);

                $.each(AllValues, function (index, value) {
                    var row = $("<tr id='Proctr" + index + "'><td  id='ProctdSubjID" + index + "' style='text-align: center'>" + value.SubjID +                        
                        "</td><td id='ProctdRandom" + index + "' style='text-align: center'>" + value.Randomization +
                        "</td><td id='ProctdLength" + index + "'>" + value.Length +
                        "</td><td id='ProctdWidth" + index + "'>" + value.Width +
                        "</td><td id='ProctdDProc" + index + "'>" + value.DProc +
                        "</td><td id='ProctdTBegan" + index + "'>" + value.TBegan +
                        "</td><td id='ProctdTEnded" + index + "'>" + value.TEnded +
                        "</td><td id='ProctdTCeReached" + index + "'>" + value.TCeReached +
                        "</td><td id='ProctdTLeReached" + index + "'>" + value.TLeReached +
                        "</td><td id='ProctdProcOptions" + index + "' style='text-align: center'>" +
                        "<button id='Procedit" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-pencil'></i>" + "</button>" +
                        "<button id='Procsave" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-floppy-o'></i>" + "</button>" +
                        "<button id='Procdelete" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-trash'></i>" + "</button>" +
                        "</td><tr>");
                    $("#table-Proc").append(row);
                });
            },
            error: function () {
                alert("Something got wrong");
            }
        }).done(function () {
            //edit[i] code
            var Edits = document.querySelectorAll('[id ^= "Procedit"]'),
                EditsArray = Array.prototype.slice.call(Edits);
            var trs = document.querySelectorAll('[id ^= "Proctr"]'),
                tdSubjIDs = document.querySelectorAll('[id ^= "ProctdSubjID"]'),
                tdRandom = document.querySelectorAll('[id ^= "ProctdRandom"]'),
                tdLength = document.querySelectorAll('[id ^= "ProctdLength"]'),
                tdWidth = document.querySelectorAll('[id ^= "ProctdWidth"]'),
                tdDProc = document.querySelectorAll('[id ^= "ProctdDProc"]'),
                tdTBegan = document.querySelectorAll('[id ^= "ProctdTBegan"]'),
                tdTEnded = document.querySelectorAll('[id ^= "ProctdTEnded"]'),
                tdTCeReached = document.querySelectorAll('[id ^= "ProctdTCeReached"]'),
                tdTLeReached = document.querySelectorAll('[id ^= "ProctdTLeReached"]'),
                tdOptions = document.querySelectorAll('[id ^= "ProctdOptions"]');

            EditsArray.forEach(function (Edit, index) {
                Edit.addEventListener('click', function (e) {
                    e.preventDefault();
                    tdRandom[index].contentEditable = true;
                    tdLength[index].contentEditable = true;
                    tdWidth[index].contentEditable = true;
                    tdDProc[index].contentEditable = true;
                    tdTBegan[index].contentEditable = true;
                    tdTEnded[index].contentEditable = true;
                    tdTCeReached[index].contentEditable = true;
                    tdTLeReached[index].contentEditable = true;
                })
            })

            //delete[i] code
            var Deletes = document.querySelectorAll('[id ^= "Procdelete"]'),
                DeletesArray = Array.prototype.slice.call(Deletes);

            DeletesArray.forEach(function (Save, index) {
                Save.addEventListener('click', function (e) {
                    e.preventDefault();
                    obj = {
                        SubjID: tdSubjIDs[index].innerHTML
                    };
                    $.ajax({
                        type: "POST",
                        url: "/VASValue/DeleteProc",
                        dataType: "json",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data.returnvalue == "1") {
                                trs[index].remove();
                            }
                            else if (data.returnvalue == "0") {
                                alert("You cannot delete this Subject, since you have that in Procedure table!")
                            }
                        },
                        error: function () {
                            alert("Something got wrong!")
                        }
                    })
                })
            })

            //save[i] code
            var Saves = document.querySelectorAll('[id ^= "Procsave"]'),
                SavesArray = Array.prototype.slice.call(Saves);

            SavesArray.forEach(function (Save, index) {
                Save.addEventListener('click', function (e) {
                    e.preventDefault();
                    obj = {
                        SubjID: tdSubjIDs[index].innerHTML,
                        Randomization: tdRandom[index].innerHTML,
                        Length: tdLength[index].innerHTML,
                        Width: tdWidth[index].innerHTML,
                        DProc: tdDProc[index].innerHTML,
                        TBegan: tdTBegan[index].innerHTML,
                        TEnded: tdTEnded[index].innerHTML,
                        TCeReached: tdTCeReached[index].innerHTML,
                        TLeReached: tdTLeReached[index].innerHTML
                    };
                    $.ajax({
                        type: "POST",
                        url: "/VASValue/EditProc",
                        dataType: "json",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data.returnvalue) {
                                alert("Success!")
                            }
                        },
                        error: function () {
                            alert("Something got wrong!")
                        }
                    })
                })
            })
        })
    })

    //get Adverse Events all values table
    AE.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Invitation").css("display", "none");
        $("#section-Demog").css("display", "none");
        $("#section-Proc").css("display", "none");
        $("#section-AE").css("display", "inline-flex");

        //get Adverse Events all values table
        $.ajax({
            type: 'POST',
            url: "/VASValue/GetLumendiAllAE",

            contentType: "application/json; charset=utf-8",
            success: function (data) {

                AllValues = JSON.parse(data);

                $.each(AllValues, function (index, value) {
                    var row = $("<tr id='AEtr" + index + "'><td  id='AEtdSubjID" + index + "' style='text-align: center'>" + value.SubjID +
                        "</td><td id='AEtdVisitNo" + index + "' style='text-align: center'>" + value.VisitNo +
                        "</td><td id='AEtdAEDiscription" + index + "'>" + value.AEDiscription +
                        "</td><td id='AEtdSeverity" + index + "'>" + value.Severity +
                        "</td><td id='AEtdOptions" + index + "' style='text-align: center'>" +
                        "<button id='AEedit" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-pencil'></i>" + "</button>" +
                        "<button id='AEsave" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-floppy-o'></i>" + "</button>" +
                        "<button id='AEdelete" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-trash'></i>" + "</button>" +
                        "</td><tr>");
                    $("#table-AE").append(row);
                });

            },
            error: function () {
                alert("Something got wrong");
            }
        }).done(function () {
            //edit[i] code
            var Edits = document.querySelectorAll('[id ^= "AEedit"]'),
                EditsArray = Array.prototype.slice.call(Edits);
            var trs = document.querySelectorAll('[id ^= "AEtr"]'),
                tdSubjIDs = document.querySelectorAll('[id ^= "AEtdSubjID"]'),
                tdVisitNo = document.querySelectorAll('[id ^= "AEtdVisitNo"]'),
                tdAEDiscription = document.querySelectorAll('[id ^= "AEtdAEDiscription"]'),
                tdSeverity = document.querySelectorAll('[id ^= "AEtdSeverity"]'),
                tdOptions = document.querySelectorAll('[id ^= "AEtdOptions"]');

            EditsArray.forEach(function (Edit, index) {
                Edit.addEventListener('click', function (e) {
                    e.preventDefault();
                    tdAEDiscription[index].contentEditable = true;
                    tdSeverity[index].contentEditable = true;

                })
            })

            //delete[i] code
            var Deletes = document.querySelectorAll('[id ^= "AEdelete"]'),
                DeletesArray = Array.prototype.slice.call(Deletes);

            DeletesArray.forEach(function (Save, index) {
                Save.addEventListener('click', function (e) {
                    e.preventDefault();
                    obj = {
                        SubjID: tdSubjIDs[index].innerHTML,
                        VisitNo: tdVisitNos[index].innerHTML
                    };
                    $.ajax({
                        type: "POST",
                        url: "/VASValue/DeleteAE",
                        dataType: "json",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data.returnvalue == "1") {
                                trs[index].remove();
                            }
                            else if (data.returnvalue == "0") {
                                alert("You cannot delete this Subject, since you have that in Procedure table!")
                            }
                        },
                        error: function () {
                            alert("Something got wrong!")
                        }
                    })
                })
            })

            //save[i] code
            var Saves = document.querySelectorAll('[id ^= "AEsave"]'),
                SavesArray = Array.prototype.slice.call(Saves);

            SavesArray.forEach(function (Save, index) {
                Save.addEventListener('click', function (e) {
                    e.preventDefault();
                    obj = {
                        SubjID: tdSubjIDs[index].innerHTML,
                        VisitNo: tdVisitNo[index].innerHTML,
                        AEDiscription: tdAEDiscription[index].innerHTML,
                        Severity: tdSeverity[index].innerHTML
                    };
                    $.ajax({
                        type: "POST",
                        url: "/VASValue/EditAE",
                        dataType: "json",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data.returnvalue == "1") {
                                alert("Success!")
                            }
                        },
                        error: function () {
                            alert("Something got wrong!")
                        }
                    })
                })
            })
        })
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