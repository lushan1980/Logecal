
var arr = document.referrer.split("/");
var url = arr.slice(-1)[0] ;
if (url !== "VerifyEmail?SurveyID=1" && url !== "Signup?SurveyID=1") {
    window.location.replace("/VAS/VerifyEmail?SurveyID=1");
}     

$(document).ready(function () { 
    for (var i = 18; i <= 80; i++) {
        var select = document.getElementById("age");
        var option = document.createElement("OPTION");
        select.options.add(option);
        option.text = i;
        option.value = i;
    }

    function displayRadioValue() {
        var ele = document.getElementsByName('gender');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                var gender = ele[i].value;
        }
        return gender;
    } 
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    var isIE = false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 79
    //var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var isChrome = Boolean(window.chrome);
    // Edge (based on chromium) detection
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

    var event;
    if (isChrome == true || isEdge == true) {
        event = "input";
    } else if (isIE == true || isFirefox == true) {
        event = "change";
    }
    else { event = "input"; }


    var dragItem = document.querySelector("#diamond");
    var HValue = 5, VValue = 5;

    var F1 = (Math.sqrt(HValue * HValue + VValue * VValue) / (10 * Math.sqrt(2))).toFixed(2);
    var F2 = (((10 - parseFloat(VValue) + 0.5) / (parseFloat(HValue) + 0.5) - (0.5 / (10.5))) / 21).toFixed(2);
    //document.getElementById("coords1").innerHTML = F1;
    //document.getElementById("coords2").innerHTML = F2;
    //var container = document.querySelector("#VASbox");
    var Vslider = document.getElementById("VerticalSlider");
    var Hslider = document.getElementById("HorizontalSlider");
    var y = 0;
    var x = 0;


    Vslider.addEventListener(event, Vsliderfunction);
    function Vsliderfunction() {
        HValue = HorizontalValue();
        VValue = VerticalValue();
        var F1 = (Math.sqrt(HValue * HValue + VValue * VValue) / (10 * Math.sqrt(2))).toFixed(2);
        var F2 = (((10 - parseFloat(VValue) + 0.5) / (parseFloat(HValue) + 0.5) - (0.5 / (10.5))) / 21).toFixed(2);
        //document.getElementById("coords1").innerHTML = F1;
        //document.getElementById("coords2").innerHTML = F2;
    }


    Hslider.addEventListener(event, Hsliderfunction);
    function Hsliderfunction() {  //when a user writes something in an <input> field
        //HorizontalValue();
        HValue = HorizontalValue();
        VValue = VerticalValue();
        var F1 = (Math.sqrt(HValue * HValue + VValue * HValue) / (10 * Math.sqrt(2))).toFixed(2);
        var F2 = (((10 - parseFloat(VValue) + 0.5) / (parseFloat(HValue) + 0.5) - (0.5 / (10.5))) / 21).toFixed(2);
        //document.getElementById("coords1").innerHTML = F1;
        //document.getElementById("coords2").innerHTML = F2;
    }


    function VerticalValue() {
        VValue = Vslider.value;
        //outputV.innerHTML = Vslider.value;
        y = -(VValue - 5) * 40;
        dragItem.style.transform = "translate(" + x + "px, " + y + "px)";
        return VValue;
    }

    function HorizontalValue() {
        HValue = Hslider.value;
        //outputH.innerHTML = Hslider.value;
        x = (HValue - 5) * 40;
        dragItem.style.transform = "translate(" + x + "px, " + y + "px)";
        return HValue;
    }


    //submit
    $("#btnSubmit").on('click', function () {
        $('#SurveyForm').on('submit', function (event) {
            event.preventDefault();

            HValue = HorizontalValue();
            VValue = VerticalValue();
            var F1 = (Math.sqrt(HValue * HValue + VValue * VValue) / (10 * Math.sqrt(2))).toFixed(2);
            var F2 = (((10 - parseFloat(VValue) + 0.5) / (parseFloat(HValue) + 0.5) - (0.5 / (10.5))) / 21).toFixed(2);

            //const queryString = window.location.search;
            //const urlParams = new URLSearchParams(queryString);
            //const UserID = urlParams.get('UserID');
            const UserID = getParameterByName('UserID');
            
            //var now = new Date().toLocaleString();
            //console.log(UserID);
            var obj = {
                UserID: UserID,
                Age : $('#age').val(),
                //Gender: $('#gender').val(),
                Gender: displayRadioValue(),
                F1 : F1,
                F2: F2,

            };

            $.ajax({
                type: "POST",
                url: "/VASValue/InsertASurvey",
                dataType: "json",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.returnvalue) {
                        alert("success");
                    }
                    else {
                        alert("bad");
                    }
                }
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

})

