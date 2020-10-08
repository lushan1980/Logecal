
$(document).ready(function () {
    var Demog = document.getElementById('Summary0'),
        Proc = document.getElementById('Summary1'),
        AE = document.getElementById('Summary2');

    //get Demographics all values table
    $.ajax({
        type: 'POST',
        url: "/VASValue/GetLumendiAllDemog",

        contentType: "application/json; charset=utf-8",
        success: function (data) {

            AllValues = JSON.parse(data);

            $.each(AllValues, function (index, value) {
                var row = $("<tr id='tr" + index + "'><td  id='tdUserID" + index + "' style='text-align: center'>" + value.UserID +
                    "</td><td id='tdSubjID" + index + "' style='text-align: center'>" + value.SubjID +
                    "</td><td id='tdAge" + index + "' style='text-align: center'>" + value.Age +
                    "</td><td id='tdGender" + index + "'>" + value.Gender +
                    "</td><td id='tdRaceEthni" + index + "'>" + value.RaceEthni +
                    "</td><td id='tdOptions" + index + "' style='text-align: center'>" +
                    "<button id='edit" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-pencil'></i>" + "</button>" +
                    "<button id='save" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-floppy-o'></i>" + "</button>" +
                    "<button id='delete" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-trash'></i>" + "</button>" +                    
                    "</td><tr>");
                $("#table-Demog").append(row);
            });

        },
        error: function () {
            alert("Something got wrong");
        }
    }).done(function () {
        //edit[i] code
        var Edits = document.querySelectorAll('[id ^= "edit"]'),
            EditsArray = Array.prototype.slice.call(Edits);
        var trs = document.querySelectorAll('[id ^= "tr"]'),
            tdUserIDs = document.querySelectorAll('[id ^= "tdUserID"]'),
            tdSubjIDs = document.querySelectorAll('[id ^= "tdSubjID"]'),
            tdAges = document.querySelectorAll('[id ^= "tdAge"]'),
            tdGenders = document.querySelectorAll('[id ^= "tdGender"]'),
            tdRaceEthnis = document.querySelectorAll('[id ^= "tdRaceEthni"]'),
            tdOptions = document.querySelectorAll('[id ^= "tdOptions"]');
        
        EditsArray.forEach(function (Edit, index) {
            Edit.addEventListener('click', function (e) {
                e.preventDefault();
                //trs[index].contentEditable = true;
                tdAges[index].contentEditable = true;
                tdGenders[index].contentEditable = true;
                tdRaceEthnis[index].contentEditable = true;
                //tdOptions[index].contentEditable = false;
            })
        })

        //delete[i] code
        var Deletes = document.querySelectorAll('[id ^= "delete"]'),
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
        var Saves = document.querySelectorAll('[id ^= "save"]'),
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

    //get Demographics all values table
    Demog.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Demog").css("display", "inline-flex");
        $("#section-AE").css("display", "none");
        $("#section-Proc").css("display", "none");
    })

    //Procedure Link event
    Proc.addEventListener('click', function (e) {
        e.preventDefault();
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
                    var row = $("<tr id='tr" + index + "'><td  id='tdSubjID" + index + "' style='text-align: center'>" + value.SubjID +                        
                        "</td><td id='tdRandom" + index + "' style='text-align: center'>" + value.Randomization +
                        "</td><td id='tdLength" + index + "'>" + value.Length +
                        "</td><td id='tdWidth" + index + "'>" + value.Width +
                        "</td><td id='tdDProc" + index + "'>" + value.DProc +
                        "</td><td id='tdTBegan" + index + "'>" + value.TBegan +
                        "</td><td id='tdTEnded" + index + "'>" + value.TEnded +
                        "</td><td id='tdTCeReached" + index + "'>" + value.TCeReached +
                        "</td><td id='tdTLeReached" + index + "'>" + value.TLeReached +
                        "</td><td id='tdProcOptions" + index + "' style='text-align: center'>" +
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
        })
    })

    //get Adverse Events all values table
    AE.addEventListener('click', function (e) {
        e.preventDefault();
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
                    var row = $("<tr id='tr" + index + "'><td  id='tdUserID" + index + "' style='text-align: center'>" + value.UserID +
                        "</td><td id='tdSubjID" + index + "' style='text-align: center'>" + value.SubjID +
                        "</td><td id='tdAge" + index + "' style='text-align: center'>" + value.Age +
                        "</td><td id='tdGender" + index + "'>" + value.Gender +
                        "</td><td id='tdRaceEthni" + index + "'>" + value.RaceEthni +
                        "</td><td id='tdOptions" + index + "' style='text-align: center'>" +
                        "<button id='edit" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-pencil'></i>" + "</button>" +
                        "<button id='save" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-floppy-o'></i>" + "</button>" +
                        "<button id='delete" + index + "' type='button' class='button_icon'>" + "<i class='fa fa-trash'></i>" + "</button>" +
                        "</td><tr>");
                    $("#table-AE").append(row);
                });

            },
            error: function () {
                alert("Something got wrong");
            }
        })
    })

})