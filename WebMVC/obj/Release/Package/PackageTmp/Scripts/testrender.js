$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/DATA/GetSampleData",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var data = JSON.parse(data);

            var actual_cases = data.map(function (val) {
                return {
                    label: val.Date,
                    y: val.Actual_cases
                }
            });
            var new_cases = data.map(function (val) {
                return {
                    label: val.Date,
                    y: val.New_cases
                }
            });
            var Projected = data.map(function (val) {
                return {
                    label: val.Date,
                    y: val.Projected
                }
            });

            var Projected_region = data.map(function (val) {
                return {
                    label: val.Date,
                    y: [val.Projected_lower, val.Projected_upper]
                }
            });
            var chart = new CanvasJS.Chart("chartContainer", {

                colorSet: "colorSet2",
                title: {
                    text: "Cases"
                },
                axisY: {
                    title: "Number of New Daily Cases",
                    includeZero: false,
                    crosshair: {
                        color: "orange",
                        enabled: true
                    },
                    gridColor: "lightgray",
                    gridThickness: 1
                },
                axisX: {
                    interval: 15,
                    //intervalType: "Month",
                    valueFormatString: "DD MMM YYYY",
                    //gridThickness: 0,
                    crosshair: {
                        enabled: true,
                        color: "orange"
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
                    name: "Actual Cases",
                    showInLegend: true,
                    color: "lightblue",
                    markerSize: 1,
                    dataPoints: actual_cases
                },
                {
                    type: "line",
                    name: "New Cases",
                    showInLegend: true,
                    markerType: "circle",
                    markerSize: 6,
                    lineThickness: 1,
                    color: "DarkSlateGray",
                    dataPoints: new_cases
                },
                {
                    type: "line",
                    lineDashType: "dash",
                    name: "Projected New Cases",
                    showInLegend: true,
                    color: "Brown",
                    markerSize: 0,
                    dataPoints: Projected
                },

                {
                    type: "rangeSplineArea",
                    lineDashType: "dash",
                    lineThickness: 0,
                    fillOpacity: 0.1,
                    //name: "Projected New Cases Region",
                    showInLegend: false,
                    color: "gray",
                    markerSize: 0,
                    dataPoints: Projected_region
                }
                ]

            });

            chart.render();
        }
    })

})