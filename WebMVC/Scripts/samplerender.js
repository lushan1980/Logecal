
$(document).ready(function () {

    var url = window.location.pathname;
    var obj = new Object();

    if (url == '/COVID19/USA') {
        obj = { Type: 'USA', Plot: 'United States' };
    }
    else if (url == '/COVID19/USAStates') {
        obj = { Type: 'state', Plot: '%' };
    }
    else if (url == '/COVID19/USACities') {
        obj = { Type: 'city', Plot: '%' };
    }
    else if (url == '/COVID19/Canada') {
        obj = { Type: 'Canada', Plot: '%' };
    }
    else if (url == '/COVID19/Europe') {
        obj = { Type: 'Europe', Plot: '%' };
    }
    else if (url == '/COVID19/Asia') {
        obj = { Type: 'Asia', Plot: '%' };
    }
    else if (url == '/COVID19/MiddleEast') {
        obj = { Type: 'Middle East', Plot: '%' };
    }
    else if (url == '/COVID19/SouthAmerica') {
        obj = { Type: 'South America', Plot: '%' };
    }
    else if (url == '/COVID19/Africa') {
        obj = { Type: 'Africa', Plot: '%' };
    }
    else { obj = null };

    if (url == '/COVID19/Index') {
        $("#main").append();
    }
    else if (url == '/COVID19/USA') {
        $("#main").append();
    }
    else if (url == '/COVID19/Test') {
        $("#main").append();
    }
    else {
        $("#main").append('<div class="grid" id="casegraph"><div class="grid__column grid__column--12 grid__column--12--lg"><h2 style="padding-bottom: 20px">Daily Infections</h2><div id="gif1"></div></div></div>');
        $("#main").append('<div class="grid" id="deathgraph"><div class="grid__column grid__column--12 grid__column--12--lg"><h2 style="padding-top:40px; padding-bottom: 20px">Daily Deaths</h2><div id="gif2"></div></div></div>');
    }

    $("#gif1").append('<img src="/assets/images/loading.gif" alt="Loading...">');
    $("#gif2").append('<img src="/assets/images/loading.gif" alt="Loading...">');

    $.ajax({
        type: "POST",
        url: "/DATA/GetData",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",  
        success: function (data) {
            //if (data != null) {
            //    alert("success");
            //} else {
            //    alert("Something went wrong");
            //}              
            var sample = JSON.parse(data);
            $("#gif1").remove();
            $("#gif2").remove();
            var chart1s = [];
            var chart2s = [];

            var url = window.location.pathname;

            if (url == '/COVID19/USA') {
                $("#casegraph").append('<div class="grid__column grid__column--12 grid__column--6--lg" id="chartContainer10" style="height: 300px; padding: 30px;"></div>');
                $("#casegraph").append('<div class="grid__column grid__column--12 grid__column--6--lg" id="chartContainer20" style="height: 300px; padding: 30px"></div>');
                //$("#casegraph").append('<center><div><img src="/Sources/loading.gif" alt="Loading..."></div></center>');        
            }
            else {
                for (i = 0; i < sample.length; i++) {
                    var cases = '<div class="grid__column grid__column--12 grid__column--6--lg" id="chartContainer1' + i + '" style="height: 300px; padding:30px"></div>';
                    var deaths = '<div class="grid__column grid__column--12 grid__column--6--lg" id="chartContainer2' + i + '" style="height: 300px; padding:30px"></div>';
                    $("#casegraph").append(cases);
                    $("#deathgraph").append(deaths);
                };
            };

            for (i = 0; i < sample.length; i++) {

                var statesample = sample[i].ListSamples;

                var death_proj_date = statesample[0].Death_proj_date;
                var death_proj_total = statesample[0].Death_proj_total;

                var Proj = statesample.map(function (val) {
                    return {
                        label: val.Date,
                        y: val.Proj
                    }
                });
                var Dotted_proj = statesample.map(function (val) {
                    return {
                        label: val.Date,
                        y: val.Dotted_proj
                    }
                });
                var Dcases = statesample.map(function (val) {
                    return {
                        label: val.Date,
                        y: val.Dcases
                    }
                });
                var Proj_Region = statesample.map(function (val) {
                    return {
                        label: val.Date,
                        y: [val.Proj_lower, val.Proj_upper]
                    }
                });
                var Inflection = statesample.map(function (val) {
                    return {
                        label: val.Date,
                        y: val.Inflection
                    }
                });
                var Proj_death = statesample.map(function (val) {
                    return {
                        label: val.Date,
                        y: val.Proj_death
                    }
                });
                var Dotted_proj_death = statesample.map(function (val) {
                    return {
                        label: val.Date,
                        y: val.Dotted_proj_death
                    }
                });
                var Death = statesample.map(function (val) {
                    return {
                        label: val.Date,
                        y: val.Death
                    }
                });
                var Proj_death_Region = statesample.map(function (val) {
                    return {
                        label: val.Date,
                        y: [val.Proj_death_lower, val.Proj_death_upper]
                    }
                });


                var titles = [];
                titles[i] = sample[i].Plot;
                var chart1options = {
                    backgroundColor: "transparent",
                    colorSet: "colorSet2",
                    title: {
                        text: titles[i]
                    },
                    subtitles: [{
                        text: "Number of New Daily Cases",
                        fontSize: 13
                    }],
                    axisY: {
                        //title: "Number of New Daily Cases",
                        includeZero: false,
                        crosshair: {
                            enabled: true
                        },
                        gridThickness: 1
                        //Prefix: "$"
                    },
                    axisX: {
                        interval: 15,
                        //intervalType: "Month",
                        valueFormatString: "DD MMM YYYY",
                        //gridThickness: 0,
                        crosshair: {
                            enabled: true,
                            snapToDataPoint: true
                        },
                        //      stripLines: [{
                        // value: 27,
                        // label: " ",
                        // labelFontColor: "#808080",
                        // labelAlign: "near"
                        //}]
                        labelAngle: -45
                    },
                    legend: {
                        cursor: "pointer",
                        verticalAlign: "top",
                        horizontalAlign: "center",
                        dockInsidePlotArea: false,
                        //itemclick: toogleDataSeries
                    },
                    data: [{
                        type: "line",
                        name: "New Case Projections",
                        showInLegend: true,
                        color: "blue",
                        markerSize: 0,
                        dataPoints: Proj
                    },
                    {
                        type: "line",
                        lineDashType: "dash",
                        name: "Dotted Projection",
                        showInLegend: true,
                        color: "red",
                        markerSize: 0,
                        dataPoints: Dotted_proj
                    },
                    {
                        type: "scatter",
                        name: "Daily Cases",
                        showInLegend: true,
                        markerType: "circle",
                        markerSize: 4,
                        color: "gray",
                        dataPoints: Dcases
                    },
                    {
                        type: "rangeSplineArea",
                        lineDashType: "dash",
                        fillOpacity: 0.1,
                        //name: "Projected New Cases Region",
                        showInLegend: false,
                        color: "red",
                        markerSize: 0,
                        dataPoints: Proj_Region
                    },
                    {
                        type: "scatter",
                        name: "Inflection Point",
                        showInLegend: true,
                        markerType: "circle",
                        color: "red",
                        markerSize: 7,
                        dataPoints: Inflection
                    }
                    ]
                }
                var subtitle2 = "* Projected total deaths until ".concat(death_proj_date, " : ", death_proj_total);
                var chart2options = {
                    backgroundColor: "transparent",
                    colorSet: "colorSet2",
                    title: {
                        text: titles[i]
                    },
                    subtitles: [
                        {
                            display: true,
                            text: "New Daily Death Analysis",
                            fontSize: 13
                        },
                        {
                            display: true,
                            text: subtitle2,
                            dockInsidePlotArea: true,
                            horizontalAlign: "left",
                            fontSize: 10
                        }
                    ],
                    axisY: {
                        //title: "Number of New Daily Cases",
                        includeZero: false,
                        crosshair: {
                            enabled: true
                        },
                        gridThickness: 1
                        //Prefix: "$"
                    },
                    axisX: {
                        interval: 15,
                        //intervalType: "Month",
                        valueFormatString: "DD MMM YYYY",
                        //gridThickness: 0,
                        crosshair: {
                            enabled: true,
                            snapToDataPoint: true
                        },
                        labelAngle: -45
                    },
                    legend: {
                        cursor: "pointer",
                        verticalAlign: "top",
                        horizontalAlign: "center",
                        dockInsidePlotArea: false,
                        //itemclick: toogleDataSeries
                    },
                    data: [{
                        type: "line",
                        name: "New Case Projections",
                        showInLegend: true,
                        color: "blue",
                        markerSize: 0,
                        dataPoints: Proj_death
                    },
                    {
                        type: "line",
                        lineDashType: "dash",
                        name: "Dotted Projection",
                        showInLegend: true,
                        color: "red",
                        markerSize: 0,
                        dataPoints: Dotted_proj_death
                    },
                    {
                        type: "scatter",
                        name: "Daily Cases",
                        showInLegend: true,
                        markerType: "circle",
                        markerSize: 5,
                        color: "gray",
                        dataPoints: Death
                    },
                    {
                        type: "rangeSplineArea",
                        lineDashType: "dash",
                        fillOpacity: 0.1,
                        //name: "Projected New Cases Region",
                        showInLegend: false,
                        color: "red",
                        markerSize: 0,
                        dataPoints: Proj_death_Region
                    }
                    ]

                }

                chart1s[i] = new CanvasJS.Chart("chartContainer1" + i, chart1options);
                //chart1s[i] = new CanvasJS.Chart(chart1Div.id, chart1options);
                chart1s[i].render();
                chart2s[i] = new CanvasJS.Chart("chartContainer2" + i, chart2options);
                //chart2s[i] = new CanvasJS.Chart(chart2Div.id, chart2options);
                chart2s[i].render();

            };
        },
        //error: function () {
        //    alert('Error');
        //}
    })
               
})