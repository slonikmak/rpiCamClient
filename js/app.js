$(function () {

    var socket;

    $("#connect").on("click", function (e) {
        console.log("start connect!");
        socket = initSocket($("#socketIP").val());
    });

    function accelerometerUpdate(event) {

        var aX = Math.round(event.accelerationIncludingGravity.x*1);
        var aY = Math.round(event.accelerationIncludingGravity.y*1);
        $("#accX").text(aX);
        $("#accY").text(aY);
        var l,r,t,b;
        if (aY < 0) {
            r = 0;
            l = mapData(aY, 7);
        } else {
            r = mapData(aY,7);
            l = 0;
        }
        if (aX < 0) {
            t = mapData(aX, 7);
            b = 0;
        } else {
            t = 0;
            b = mapData(aX, 7);
        }

        var msg = l+","+t+","+b+","+r+";";
        log("recived "+msg);
        socket.send(msg);

    }

    if (window.DeviceMotionEvent == undefined) {
        //No accelerometer is present. Use buttons.
        log("no accel");
    } else {
        log("init accel");
        window.addEventListener("devicemotion", accelerometerUpdate, true);
    }

    function mapData(data, max) {
        if (Math.abs(data)>max){
            return max;
        } else return Math.abs(data);
    }
});

