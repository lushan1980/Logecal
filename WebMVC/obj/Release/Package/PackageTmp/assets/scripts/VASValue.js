
$(document).ready(function () {

    //one dimension script code
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;    

    slider.oninput = function () {
        OneDimValue();
    }
    function OneDimValue() {
        var OneDimValue = slider.value;
        output.innerHTML = slider.value;
        return OneDimValue;
    }

    

    // Two Dimension script code
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    // Create gradient
    var grd = ctx.createLinearGradient(0, myCanvas.height, myCanvas.width, 0);
    grd.addColorStop(.0, 'red');
    grd.addColorStop(.4, 'orange');
    grd.addColorStop(1, 'green');

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(50, 50, 300, 300);

    var rect = myCanvas.getBoundingClientRect();

    //document.getElementById('ball').style.left = rect.left + 200 + 'px';
    //document.getElementById('ball').style.top = rect.left + 200 + 'px';

    myCanvas.onclick = function (e) { // shows click coordinates
        
        
        var x = parseFloat(((e.clientX - rect.left - 50) / 30));
        var y = parseFloat((10 - (e.clientY - rect.top - 50) / 30));

        if (x < 0) x = 0;
        if (x > 10) x = 10;
        if (y < 0) y = 0;
        if (y > 10) y = 10; 

        var z1 = (Math.sqrt(x ** 2 + y ** 2) / (10 * Math.sqrt(2))).toFixed(2);
        var z2 = (((10 - y + 0.5) / (x + 0.5) - (0.5 / (10.5))) / 21).toFixed(2);

        //coords.innerHTML = x + ':' + y;
        //coords1.innerHTML = z1;
        //coords2.innerHTML = z2;
        document.getElementById("coords1").value = z1;
        document.getElementById("coords2").value = z2;
    };

    /////////////////////////////////////////
    //let currentDroppable = null;

    //ball.onmousedown = function (event) {

    //    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    //    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    //    ball.style.position = 'absolute';
    //    ball.style.zIndex = 1000;

    //    function moveAt(pageX, pageY) {
    //        ball.style.left = pageX - shiftX + 'px';
    //        ball.style.top = pageY - shiftY + 'px';
    //    }

    //    function onMouseMove(event) {
    //        moveAt(event.pageX, event.pageY);
    //    }

    //    document.addEventListener('mousemove', onMouseMove);

    //    ball.onmouseup = function () {
    //        document.removeEventListener('mousemove', onMouseMove);
    //        ball.onmouseup = null;
    //    };

    //};

    //ball.ondragstart = function () {
    //    return false;
    //};
    ////////////////////////////////////////


    // Form submit
    $('#btnsubmit').click(function () {

        var obj = {};
        obj.OneDim = OneDimValue();
        obj.TwoDimF1 = document.getElementById("coords1").value;
        obj.TwoDimF2 = document.getElementById("coords2").value;
       

        $.ajax({
            type: "POST",
            url: "/VASValue/getVASValue",
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
})



