$(document).ready(function () {

    const UserID = getParameterByName('UserID'),            
          SurveyID = getParameterByName('SurveyID'),
          StudyName = getParameterByName('StudyName'),
          SignOut = document.getElementById("btnSignOut"),
          Summary1 = document.getElementById("Summary1")
          obj = { UserID: UserID };  

    //get total number of Subject
    $.ajax({
        type: 'POST',
        url: "/VASValue/CountSubj",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var AllValues = JSON.parse(data);
            document.getElementById("SubjNum").value = AllValues[0].Overall;
            document.getElementById("DeviceNum").value = AllValues[0].Device;
            document.getElementById("ControlNum").value = AllValues[0].Control;

        },
        error: function () {
            alert("Something got wrong");
        }
    });

    //get Demographics all values table
    $.ajax({
        type: 'POST',
        url: "/VASValue/GetLumendiDemog",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            AllValues = JSON.parse(data);

            $.each(AllValues, function (index, value) {
                var row = $("<tr><td>" + value.SubjID + "</td><td style='text-align: center'>" + value.Age + "</td><td>" + value.Gender + "</td><td>" + value.RaceEthni + "</td></tr>");
                $("#table").append(row);
            });

        },
        error: function () {
            alert("Something got wrong");
        }
    });

    //get Summary of Demographics
    $.ajax({
        type: 'POST',
        url: "/VASValue/SummaryDemog",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var AllValues = JSON.parse(data);
            var Age = AllValues.filter(function (entry) {
                return entry.Parameter1 === "Age";
            })
            var Gender = AllValues.filter(function (entry) {
                return entry.Parameter1 === "Gender";
            }) 
            var RaceEthni = AllValues.filter(function (entry) {
                return entry.Parameter1 === "Race/Ethnicity";
            }) 
            $.each(Age, function (index, value) {
                var row = $("<tr><td style='text-align: center'>" + value.Control + "</td><td style='text-align: center'>" + value.Device + "</td><td style='text-align: center'>" + value.Overall + "</td></tr>");
                $("#SummaryAge").append(row);
            });
            $.each(Gender, function (index, value) {
                var row = $("<tr><td>" + value.Parameter2 + "</td><td style='text-align: center'>" + value.Control + "</td><td style='text-align: center'>" + value.Device + "</td><td style='text-align: center'>" + value.Overall + "</td></tr>");
                $("#SummaryGender").append(row);
            });
            $.each(RaceEthni, function (index, value) {
                var row = $("<tr><td>" + value.Parameter2 + "</td><td style='text-align: center'>" + value.Control + "</td><td style='text-align: center'>" + value.Device + "</td><td style='text-align: center'>" + value.Overall + "</td></tr>");
                $("#SummaryRaceEthni").append(row);
            });
        },
        error: function () {
            alert("Something got wrong");
        }
    });

    //get Satification Summary
    $.ajax({
        type: 'POST',
        url: "/VASValue/SummarySatification",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            AllValues = JSON.parse(data);

            $.each(AllValues, function (index, value) {
                var row = $("<tr style='text-align: center'><td>" + value.N + "</td><td>" + value.Mean_SD + "</td><td>" + value.Median + "</td><td>" + value.Min_Max + "</td></tr>");
                $("#SatificationSummary").append(row);
            });

        },
        error: function () {
            alert("Something got wrong");
        }
    });

    //button Sign Out: change to VerifyEmail
    SignOut.addEventListener('click', function (e) {
        e.preventDefault();
        //window.location.replace("/VAS/VerifyEmail?SurveyID=3")
        window.location.replace("/VAS/Signin" + "?SurveyID=" + SurveyID + "&StudyName=" + StudyName)
    })

    Summary0.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Demog").css("display", "inline-flex");
        $("#section-Satification").css("display", "none");
        $("#section-Procedure").css("display", "none");
    })

    Summary1.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Demog").css("display", "none");
        $("#section-Satification").css("display", "inline-flex");
        $("#section-Procedure").css("display", "none");

    })

    Summary2.addEventListener('click', function (e) {
        e.preventDefault();
        $("#section-Demog").css("display", "none");
        $("#section-Satification").css("display", "none");
        $("#section-Procedure").css("display", "inline-flex");
        //get Surgery time by Gender Summary
        $.ajax({
            type: 'POST',
            url: "/VASValue/SummaryProcedure",
            dataType: "json",

            contentType: "application/json; charset=utf-8",
            success: function (data) {

                AllValues = JSON.parse(data);
                var Boxplot = AllValues.slice(0, 2);
                var Outlier = AllValues.slice(2);
                var points = Boxplot.map(function (val) {
                    return {
                        label: val.Gender,  
                        y: [val.Minimum, val.Q1, val.Q3, val.Maximum, val.Median]                      
                    }
                });
                var Means = Boxplot.map(function (val) {
                    return {
                        label: val.Gender,
                        y: val.Mean
                    }
                });
                var Outliers = Outlier.map(function (val) {
                    var x;
                    if (val.Gender == "Male") { x = 0 }
                    else { x = 1 };
                    return {
                        x: x,
                        label: val.Gender,
                        y: val.SurgeryTime
                    }
                });
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    //theme: "light1", // "light1", "light2", "dark1", "dark2"
                    title: {
                        text: "Surgery time by Gender",
                        fontSize: 20,
                    },
                    //dataPointWidth: 200,
                    axisY: {
                        title: "Average Surgery time(mm)"
                    },
                    data: [
                    {
                        type: "boxAndWhisker", //change type to bar, line, area, pie, etc
                        //indexLabel: "{y}", //Shows y value on all Data Points
                        //showInLegend: true, 
                        upperBoxColor: "#FFC28D",
                        lowerBoxColor: "#9ECCB8",
                        color: "black",
                        lineThickness: 1, //box plot median line thickness
                        whiskerThickness: 1, //box plot minimum and maxmum line thickness
                        stemThickness: 1,  //vertical line thickness
                        dataPoints: points
                    },
                    {
                        type: "scatter",
                        markerType: "circle",
                        markerSize: 4,
                        color: "blue",
                        dataPoints: Outliers
                    },
                    {
                        type: "scatter",                       
                        markerType: "square",
                        markerSize: 3,
                        color: "blue",
                        dataPoints: Means
                    },]
                });
                chart.render();


            },
            error: function () {
                alert("Something got wrong");
            }
        });

        //get Surgery time by Month Summary
        $.ajax({
            type: 'POST',
            url: "/VASValue/SummarySurgeryTimebyMonth",
            dataType: "json",

            contentType: "application/json; charset=utf-8",
            success: function (data) {

                AllValues = JSON.parse(data);

                var Device = AllValues.filter(function (el) {
                    return el.Randomization == 'Device'
                });
                var Control = AllValues.filter(function (el) {
                    return el.Randomization == 'Control'
                });

                var DeviceRanges = Device.map(function (val, index) {
                    return {
                        x: index + 0.2,
                        y: [val.Lower, val.Upper],
                        label: val.MonthProc
                        
                    }
                });
                var DeviceMeans = Device.map(function (val, index) {
                    return {
                        x: index + 0.2,
                        y: val.Mean,
                        label: val.MonthProc
                        
                    }
                });
                var ControlRanges = Control.map(function (val, index) {
                    return {
                        x: index - 0.2,
                        label: val.MonthProc,
                        y: [val.Lower, val.Upper]
                    }
                });
                var ControlMeans = Control.map(function (val, index) {
                    return {
                        x: index - 0.2,
                        label: val.MonthProc,
                        y: val.Mean
                    }
                });

                var chart = new CanvasJS.Chart("chartContainer2", {
                    animationEnabled: true,
                    //theme: "light1", // "light1", "light2", "dark1", "dark2"
                    title: {
                        text: "Surgery time by Month",
                        fontSize: 20,
                    },
                    //dataPointWidth: 200,
                    axisX: {
                        interval: 1,
                        minimum: -0.6,
                        crosshair: {
                            enabled: true
                        }
                    },
                    axisY: {
                        title: "Average Surgery time(mm)",
                        crosshair: {
                            enabled: true
                        }
                    },
                    data: [
                        {
                            type: "line", 
                            showInLegend: true,
                            name: "Device Mean",
                            toolTipContent: "<b>{label}</b><br><span style=\"color:#4F81BC\">{name}</span>: {y}",
                            markerType: "circle",
                            markerSize: 8,
                            dataPoints: DeviceMeans
                        },
                        {
                            type: "error", 
                            showInLegend: true,
                            name: "Device Error Range",
                            toolTipContent: "<b>{label}</b><br><span style=\"color:#4F81BC\">{name}</span>: {y}",
                            markerType: "none",
                            dataPoints: DeviceRanges
                        },
                        {
                            type: "line",
                            lineDashType: "dash",
                            showInLegend: true,
                            name: "Control Mean",
                            toolTipContent: "<b>{label}</b><br><span style=\"color:#4F81BC\">{name}</span>: {y}",
                            markerType: "square",
                            markerSize: 8,
                            dataPoints: ControlMeans
                        },
                        {
                            type: "error",
                            showInLegend: true,
                            name: "Control Error Range",
                            toolTipContent: "<b>{label}</b><br><span style=\"color:#4F81BC\">{name}</span>: {y}",
                            markerType: "none",
                            dataPoints: ControlRanges
                        }
                    ]
                });
                chart.render();


            },
            error: function () {
                alert("Something got wrong");
            }
        });
    })

    const Return = document.getElementById('return');
    Return.addEventListener('click', function (e) {
        e.preventDefault;
        window.location.replace("/VAS/Survey3" + "?SurveyID=" + SurveyID + "&UserID=" + UserID +  "&StudyName=" + StudyName)
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