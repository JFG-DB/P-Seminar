function load(){
timerRunning = false;
paus = 0; 
play = 0;
var func;
paused = false;
played = false;
pause = document.getElementById("pause");
fortsetzen = document.getElementById("fortsetzen");
reset = document.getElementById("reset");
pause.addEventListener("click", function () { paused = true; paus = Date.now();});
fortsetzen.addEventListener("click", function () {play = Date.now(); played = true;});
reset.addEventListener("click", function () {timerRunning =  false; document.getElementById("time").textContent = "00:00";paused = false;})
}
function startTimer0(duration, display) {
        start = Date.now();
        var diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        
        if(paused && played){duration = duration + (((play - paus) / 1000) | 0); paused = false; played = false;}else if(paused){return;}
        if(!timerRunning){clearInterval(func);return;}
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
        if (diff == 0) {
            timerRunning =  false;
            clearInterval(func);
            return;
        }
    };
    setTimeout(timer, 1000);
    
    func = setInterval(timer, 1000);
    if(!timerRunning){return;}
}

function startTimer () {
    var duration = 60 * document.getElementById("timeInput").value;
        display = document.getElementById("time");
        timerRunning = true;
    startTimer0(duration, display);
}