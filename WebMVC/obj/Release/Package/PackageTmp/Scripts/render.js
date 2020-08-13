
$(document).ready(function () {
    ws = new WebSocket("wss://" + "localhost:44343" + "/USA.ashx");
    //ws = new WebSocket("wss://logecal.azurewebsites.net/USA.ashx");

    ws.onopen = function () {

        var url = window.location.pathname;    

        if (url == '/Home/USA') {
            var obj = { Type : 'USA', Plot : 'United States'};        
        }
        else if (url == '/Home/USAStates') {
            obj = { Type: 'State', Plot: '%'};        
        }
        else if (url == '/Home/USACities') {
            obj = { Type: 'City', Plot: '%'};
        }
        else if (url == '/Home/Canada') {
            obj = { Type: 'Canada', Plot: '%' };
        }
        else if (url == '/Home/Europe') {
            obj = { Type: 'Europe', Plot: '%' };
        }
        else if (url == '/Home/Asia') {
            obj = { Type: 'Asia', Plot: '%' };
        }
        else if (url == '/Home/MiddleEast') {
            obj = { Type: 'Middle East', Plot: '%' };
        }
        else if (url == '/Home/SouthAmerica') {
            obj = { Type: 'South America', Plot: '%' };
        }
        else if (url == '/Home/Africa') {
            obj = { Type: 'Africa', Plot: '%' };
        }
        else { obj = null };   
        var msg = JSON.stringify(obj);
        ws.send(msg);

        $("#gif").append('<center><div><img src="/Sources/loading.gif" alt="Loading..."></div></center>'); 

    };

    ws.onmessage = function (e) {              // when a message was receiev from server

        var sample = JSON.parse(e.data);
        $("#gif").remove();
        var chart1s = [];
        var chart2s = [];

        var url = window.location.pathname;

        if (url == '/Home/USA') {
                $("#casegraph").append('<div class="col-md-6" id="chartContainer10" style="height: 300px;"></div>');
                $("#casegraph").append('<div class="col-md-6" id="chartContainer20" style="height: 300px;"></div>');
                //$("#casegraph").append('<center><div><img src="/Sources/loading.gif" alt="Loading..."></div></center>');        
        }
        else {
            for (i = 0; i < sample.length; i++) {  
                var cases =  '<div class="col-md-6" id="chartContainer1'+ i +'" style="height: 300px;"></div>';
                var deaths = '<div class="col-md-6" id="chartContainer2'+ i +'" style="height: 300px;"></div>';
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

    };

    ws.onclose = function () {

    };

    ws.onerror = function (e) {

    };
});

//$(document).ready(function () {
    
    //ws = new WebSocket("ws://" + "localhost/Coronavirus" + "/WebSocket.ashx");
    //ws = new WebSocket("ws://" + "192.168.0.22/Coronavirus" + "/WebSocket.ashx");
    //ws = new WebSocket("ws://" + "68.81.221.35/Coronavirus" + "/WebSocket.ashx");
    //ws = new WebSocket("ws://" + "10.0.0.172/Coronavirus" + "/WebSocket.ashx");
    //ws = new WebSocket("wss://logecal.azurewebsites.net/USA.ashx");
    //ws = new WebSocket("ws://" + "10.0.0.172/Coronavirus" + "/WebSocket.ashx");
    //ws = new WebSocket("ws://" + "69.249.66.92/Coronavirus" + "/WebSocket.ashx");
//})



    //var url = window.location.pathname;    
    //var sample;   
    //if (url == '/Home/USA') {
    //    sample = data.filter(val => { return val.Type.trim() == 'Country' && val.Plot.trim() == 'United States' })
    //}
    //else if (url == '/Home/USAStates') {
    //    sample = data.filter(val => { return val.Type.trim() == 'State' })
    //}
    //else if (url == '/Home/USACities') {
    //    sample = data.filter(val => { return val.Type.trim() == 'City' })
    //}
    //else {sample = [] };





        //var chart1Div = document.createElement('div');
        //chart1Div.setAttribute('id', 'chartContainer1' + i);
        //chart1Div.style.cssText = 'height: 300px; width: 100%;';

        //var chart2Div = document.createElement('div');
        //chart2Div.setAttribute('id', 'chartContainer2' + i);
        //chart2Div.style.cssText = 'height: 300px; width: 100%;';

        //document.getElementById('state' + i).appendChild(chart1Div);
        //document.getElementById('statedeath' + i).appendChild(chart2Div);
