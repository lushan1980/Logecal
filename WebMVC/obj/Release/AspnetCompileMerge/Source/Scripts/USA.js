$(document).ready(function () {

    ws.onopen = function () {
    };

    ws.onmessage = function (e) {              // when a message was receiev from server

        var data = JSON.parse(e.data);

        var statesample = data.find(({ Plot }) => Plot.trim() == 'United States').ListSamples;

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

        var title1 = "New Daily Case Analysis"
        var chart1options = {

            colorSet: "colorSet2",
            title: {
                text: "United States",
                fontSize: 20
            },
            subtitles: [{

                text: title1,
                fontSize: 15
            }],
            axisY: {
                title: title1,
                includeZero: false,
                crosshair: {
                    enabled: true
                },
                gridThickness: 1
                //Prefix: "$"
            },
            axisX: {
                interval: 10,
                //intervalType: "Month",
                valueFormatString: "DD MMM",
                //gridThickness: 0,
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                },

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
                markerSize: 5,
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
                markerSize: 15,
                dataPoints: Inflection
            }
            ]

        }
        var chart1 = new CanvasJS.Chart("chartContainer1", chart1options);
        chart1.render();


        var subtitle1 = "New Daily Death Analysis";
        var today = new Date().toLocaleDateString();
        
        var subtitle2 = "* Projected total deaths until ".concat(today);
        var chart2options = {

            colorSet: "colorSet2",
            title: {
                display: true,
                text: "United States",
                fontSize: 20
            },
            subtitles: [{
                display: true,
                text: subtitle1,
                fontSize: 15
            },
            {
                display: true,
                text: subtitle2,
                dockInsidePlotArea: true,
                horizontalAlign: "left",
                fontSize: 13
            }
            ],
            axisY: {
                title: subtitle1,
                includeZero: false,
                crosshair: {
                    enabled: true
                },
                gridThickness: 1
                //Prefix: "$"
            },
            axisX: {
                interval: 10,
                //intervalType: "Month",
                valueFormatString: "DD MMM",
                //gridThickness: 0,
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                },

                //labelAngle: -45
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
        var chart2 = new CanvasJS.Chart("chartContainer2", chart2options);
        chart2.render();
    };

    ws.onclose = function () {

    };

    ws.onerror = function (e) {

    };

});